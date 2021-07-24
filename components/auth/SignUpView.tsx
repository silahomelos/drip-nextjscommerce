import { FC, useEffect, useState, useCallback } from 'react'
import { validate } from 'email-validator'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Logo, Button, Input } from '@components/ui'
import { setUser, useMain } from 'context'
import { authenticate, fetchAuthToken, signup } from 'services/api.service'
import { handleSignMessage } from 'services/wallet.service'

interface Props {}

const useSignMessage = (account: string) => {
  const [signMsg, setSignMsg] = useState(null)

  useEffect(() => {}, [account])
}

const SignUpView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [signMsg, setSignMsg] = useState(null)

  const { setModalView, closeModal, openSidebar } = useUI()
  const { account, dispatch } = useMain()

  const tryToSignup = async (signMsg: any) => {
    if (!signMsg) {
      signMsg = await signup(account, username, email)
    }

    const { signature } = await handleSignMessage({
      account,
      signMsg,
    })

    const data = await authenticate(account, signMsg, signature)
    if (data) {
      const { returnData, secret } = data
      dispatch(setUser(returnData))
    }
  }

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')

      await tryToSignup(signMsg)

      setLoading(false)
      openSidebar()
      closeModal()
    } catch ({ errors }) {
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    if (dirty) {
      setDisabled(!validate(email))
    }
  }, [email, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  useEffect(() => {
    const getAuthToken = async () => {
      const msg = await fetchAuthToken(account)
      console.log({ msg })
      setSignMsg(msg)
    }

    getAuthToken()
  }, [account])

  return (
    <form
      onSubmit={handleSignup}
      className="w-80 flex flex-col space-y-3 justify-between p-3"
    >
      <h3 className="text-center uppercase text-3xl font-bold">
        {signMsg === '' || !signMsg ? 'Sign Up' : 'Welcome Back!'}
      </h3>
      {signMsg !== '' && signMsg && <p>Wallet: {account}</p>}
      {signMsg === '' && (
        <div className="flex flex-col space-y-4">
          {message && (
            <div className="text-red border border-red p-3">{message}</div>
          )}
          <Input placeholder="UserName" onChange={setUsername} />
          <Input type="email" placeholder="Email" onChange={setEmail} />
        </div>
      )}
      <div className="pt-2 w-full flex flex-col">
        <Button
          variant="slim"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          {signMsg ? 'Sign In' : 'Sign Up'}
        </Button>
      </div>
    </form>
  )
}

export default SignUpView
