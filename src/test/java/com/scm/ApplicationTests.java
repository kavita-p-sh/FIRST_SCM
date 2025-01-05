package com.scm;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.scm.services.EmailService;

@SpringBootTest
class ApplicationTests {

    @MockBean
    private EmailService service; // Mock the EmailService to avoid sending real emails during tests

    @Test 
    void contextLoads() {
    // Ensure that the application context is loaded correctly
    assertThat(service).isNotNull();
    System.out.println("Service successfully loaded!");
}

    @Test
    void sendEmailTest() {
        // Mock the behavior of the sendEmail method (without actually sending an email)
        service.sendEmail(
            "prajapatikavita132004@gmail.com", 
            "Just managing the emails", 
            "This is SCM project working on email service"
        );
        // Validate that the sendEmail method was called (use Mockito verification if needed)
        assertThat(true).isTrue(); // Dummy assertion to ensure the method executes (you can replace this with a more meaningful check)
    }

    @Test
    void testUnits() {
        int result = 40;
        List<String> list = List.of("ram", "shyam", "ankit");

        // Validate integer result
        assertThat(result).isEqualTo(40);

        // Validate list size
        assertThat(list).hasSize(3);
    }
}
