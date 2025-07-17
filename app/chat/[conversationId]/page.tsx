import ChatWindow from '../../../components/chat/ChatWindow';
import { ChatProvider } from '../../../components/chat/ChatProvider';

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );
}
