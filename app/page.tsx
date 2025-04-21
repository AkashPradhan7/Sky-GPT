"use client";

import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const redirectToChat = () => {
    router.push("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      {/* Header */}
      <header className="flex items-center justify-between p-6 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">
            🤖
          </div>
          <span className="text-xl font-semibold tracking-wide text-white">
            Sky-GPT
          </span>
        </div>
        <Button
          variant="outline"
          className="text-zinc-900 border-white hover:bg-zinc-600 hover:text-black"
          
        >
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Your Personal AI Assistant in the Cloud
        </h1>
        <p className="max-w-xl mx-auto text-lg text-gray-300 mb-6">
          Sky-GPT is a powerful chatbot clone of ChatGPT that helps you
          brainstorm, write, code, and chat—instantly.
        </p>
        <Button
          size="lg"
          className="bg-white text-black font-semibold hover:bg-gray-200 transition"
          
        >
          Try Sky-GPT Now
        </Button>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {["Natural Conversations", "Instant Answers", "Creative Support"].map(
          (feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-600 rounded-xl p-6 text-white"
            >
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              <p className="text-gray-300">
                {i === 0
                  ? "Engage in human-like chats powered by advanced AI language models."
                  : i === 1
                  ? "Get quick responses to questions, explanations, and advice."
                  : "From poems to code snippets, Sky-GPT helps you create anything."}
              </p>
            </motion.div>
          )
        )}
      </section>

      {/* Chat Section */}
      <section className="px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-3xl mx-auto h-[80vh] bg-zinc-900 border-none rounded-xl shadow-xl text-white flex flex-col overflow-hidden">
            <CardHeader className="border-b border-zinc-800 text-center">
              <CardTitle className="text-2xl font-bold">
                Chat with Sky-GPT
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-gray-400">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      How can I assist you today?
                    </h3>
                    <p>Start the conversation by typing a message below.</p>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                          message.role === "user"
                            ? "bg-zinc-700 text-white"
                            : "bg-zinc-950 text-gray-100"
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[75%] rounded-lg p-3 bg-white text-gray-700">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150" />
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-300" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </CardContent>

            <CardFooter className="border-t border-zinc-800 px-6 py-4">
              <form onSubmit={handleSubmit} className="flex w-full space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-grow bg-zinc-950 text-white border border-white placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-gray-300 hover:bg-gray-500"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-300">
        <p>&copy; {new Date().getFullYear()} Sky-GPT. All rights reserved.</p>
      </footer>
    </div>
  );
}
