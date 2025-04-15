import { faqData } from "@/data/faq"

export interface ChatMessage {
  role: "user" | "system"
  content: string
}

// This is a simple implementation. In a production environment,
// you would integrate with an actual AI service like OpenAI or use the AI SDK.
export async function processChatMessage(message: string): Promise<string> {
  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase()

  // Check for common greetings
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! How can I assist you with SL Group's services today?"
  }

  // Check for contact related questions
  if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("reach") ||
    lowerMessage.includes("email") ||
    lowerMessage.includes("phone")
  ) {
    return "You can contact SL Group through our contact form on the website, by email at info@slgroup.com, or by phone at +1-234-567-8900. Would you like me to direct you to our contact page?"
  }

  // Check for services related questions
  if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("provide")) {
    return "SL Group offers a wide range of services through our subsidiaries including tech solutions, retail, events management, property development, grooming services, and stationery supplies. Which specific service are you interested in learning more about?"
  }

  // Check for tech solutions specific questions
  if (
    lowerMessage.includes("tech solution") ||
    lowerMessage.includes("it service") ||
    lowerMessage.includes("software") ||
    lowerMessage.includes("development")
  ) {
    return "SL Tech Solutions offers comprehensive IT services including software development, cloud solutions, cybersecurity, IT consulting, and digital transformation. Would you like to schedule a consultation with our tech experts?"
  }

  // Check for tech store specific questions
  if (
    lowerMessage.includes("tech store") ||
    lowerMessage.includes("buy") ||
    lowerMessage.includes("purchase") ||
    lowerMessage.includes("product") ||
    lowerMessage.includes("order")
  ) {
    return "SL Tech Store offers a wide range of technology products including computers, smartphones, accessories, and smart home devices. You can browse our products online and place orders through our website. Would you like me to direct you to our online store?"
  }

  // Check for career related questions
  if (
    lowerMessage.includes("job") ||
    lowerMessage.includes("career") ||
    lowerMessage.includes("work") ||
    lowerMessage.includes("employ") ||
    lowerMessage.includes("apply")
  ) {
    return "SL Group regularly posts job openings across our various subsidiaries. You can view all current opportunities on our Careers page and apply directly through our website. Would you like me to direct you to our careers page?"
  }

  // Check for business hours
  if (
    lowerMessage.includes("hour") ||
    lowerMessage.includes("open") ||
    lowerMessage.includes("close") ||
    lowerMessage.includes("time")
  ) {
    return "Our business hours vary by location and subsidiary. Generally, our offices are open Monday to Friday from 9:00 AM to 5:00 PM. Retail locations may have extended hours including weekends. Please check the specific subsidiary page for detailed hours."
  }

  // Check for location related questions
  if (
    lowerMessage.includes("location") ||
    lowerMessage.includes("address") ||
    lowerMessage.includes("where") ||
    lowerMessage.includes("office")
  ) {
    return "SL Group has offices and retail locations in multiple cities. Our headquarters is located at 123 Business Avenue, Suite 500, Enterprise City. Would you like information about a specific location?"
  }

  // Check for FAQ matches
  for (const faq of faqData) {
    // Check if the user's message contains keywords from the question
    const questionWords = faq.question.toLowerCase().split(" ")
    const matchCount = questionWords.filter((word) => word.length > 3 && lowerMessage.includes(word)).length

    // If there's a significant match, return the FAQ answer
    if (matchCount >= 2 || (questionWords.length <= 5 && matchCount >= 1)) {
      return faq.answer
    }
  }

  // Default response if no specific match is found
  return "I don't have specific information about that yet. Would you like me to connect you with a human representative who can help you further? Alternatively, you can check our FAQ section or contact us directly through our contact page."
}
