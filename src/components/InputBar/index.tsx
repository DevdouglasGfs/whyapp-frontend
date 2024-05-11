import emojiIcon from '@/assets/emojiIcon.png'
import { ChatContext } from '@/contexts/chatContext'
import { useChatSocket } from '@/utils/hooks/useChatSocket'
import { useGroupChatSocket } from '@/utils/hooks/useGroupChatSocket'
import { SendNewGroupMessage } from '@/utils/hooks/useSendNewGroupMessage'
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Space } from 'antd'
import { EmojiClickData } from 'emoji-picker-react'
import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react'
import { resetButtonStyles } from './../../mocks/mockUserArray'
import { EmojiLibrary } from './EmojiPicker'
import './style.css'

export function InputBar({setShowUploud, showUploud}:{showUploud:boolean, setShowUploud: React.Dispatch<React.SetStateAction<boolean>>}) {
  const { recipient, recipientGroup } = useContext(ChatContext)
  const { socket } = useChatSocket()
  const { recipientGroupId } = useGroupChatSocket()
  const [inputValue, setInputValue] = useState<string>('')
  const [showEmojis, setShowEmojis] = useState(false)
  const sendNewGroupMessageMutation = SendNewGroupMessage()
  const [closeIconFile, setcloseIconFile] = useState(true)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    if (recipient) {
      socket?.emit('newMessage', inputValue)
    }

    if (recipientGroupId) {
      sendNewGroupMessageMutation.mutate({
        mensagem: inputValue,
        grupoId: recipientGroupId,
      })
    }

    setInputValue('')
  }

  const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const message = event?.target.value
    setcloseIconFile(false)
    if(message.length === 0) {
      setcloseIconFile(true)
    }
    setInputValue(event?.target.value)
  }

  const handleOpenEmojiDrawer = () => setShowEmojis(!showEmojis)

  const handleEmoji = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji
    setInputValue((prevInput) => prevInput + emoji)
  }

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && setcloseIconFile(!closeIconFile)
    event.key === 'Enter' && handleSendMessage()
  }

  return (
    <div className="input-bar__background">
      <Flex align="center" gap={10}>
        <Button
          className="emoji-button"
          type="text"
          style={{ ...resetButtonStyles, height: 30 }}
          onClick={handleOpenEmojiDrawer}
          disabled={!recipient && !recipientGroup}
        >
          <img src={emojiIcon} alt="emoji icon" height={'100%'} />
        </Button>
        <EmojiLibrary open={showEmojis} handleEmoji={handleEmoji} />
        {
          closeIconFile && (
            <Button
              className="attach-button"
              icon={<PaperClipOutlined style={{ fontSize: 25 }} />}
              onClick={() => setShowUploud(!showUploud)}
              type="text"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={!recipient && !recipientGroup}
            />
          )
        }
      </Flex>
      <Space.Compact className="input-bar__container">
        <Input
          placeholder="Escreva aqui"
          className="input-bar"
          value={inputValue}
          onChange={handleInputOnChange}
          onKeyDown={handleOnKeyDown}
          disabled={!recipient && !recipientGroup}
        />
        <Button
          className="send-button"
          icon={<SendOutlined />}
          size="large"
          type="text"
          onClick={handleSendMessage}
          disabled={!recipient && !recipientGroup || inputValue.trim() === ''}
        />
      </Space.Compact>
    </div>
  )
}
