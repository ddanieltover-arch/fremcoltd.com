import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  productCategory: z.enum(["sugar", "rice", "fertilizers", "edible-cooking-oil", "other"]),
  quantity: z.string().min(1, "Estimated quantity is required"),
  destination: z.string().min(2, "Destination country/port is required"),
  message: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type QuoteFormData = z.infer<typeof quoteSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
