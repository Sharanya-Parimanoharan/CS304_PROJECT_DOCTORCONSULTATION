package com.example.doc_app.controller;

import com.example.doc_app.entity.FeedBack;
import com.example.doc_app.entity.Patient;
import com.example.doc_app.service.FeedbackService;
import com.example.doc_app.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    // Save operation
    @PostMapping("/feedback")
    public String saveFeedback(
            @RequestBody FeedBack feedback)
    {
        feedbackService.saveFeedback(feedback);
        return " feedback added";
    }


    // Read operation
    @GetMapping("/feedbacks")
    public List<FeedBack> fetchFeedbackList()
    {
        return feedbackService.fetchFeedbackList();
    }
}
