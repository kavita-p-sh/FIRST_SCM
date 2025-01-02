package com.scm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.scm.services.EmailService;

@Controller
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send-email")
    public String sendEmail(Model model) {
        try {
            // Send an email with subject and body
            emailService.sendEmail("prajapatikavita132004@gmail.com", "Test Subject", "This is a test email.");
            model.addAttribute("message", "Email sent successfully!");
            return "/success_page"; // Thymeleaf template for success
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "Failed to send email. Please try again later.");
            return "/error_page"; // Thymeleaf template for error
        }
    }
}
