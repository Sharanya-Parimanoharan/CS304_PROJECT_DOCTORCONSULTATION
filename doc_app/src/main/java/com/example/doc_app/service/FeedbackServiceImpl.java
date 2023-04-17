package com.example.doc_app.service;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.FeedBack;
import com.example.doc_app.repository.DoctorRepository;
import com.example.doc_app.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FeedbackServiceImpl implements FeedbackService{

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Save operation
    @Override
    public FeedBack saveFeedback(FeedBack feedback)
    {
        return feedbackRepository.save(feedback);
    }

    // Read operation
    @Override
    public List<FeedBack> fetchFeedbackList()
    {
        return
                feedbackRepository.findAll();
    }
}
