package com.example.doc_app.service;

import com.example.doc_app.entity.Doctor;
import com.example.doc_app.entity.FeedBack;

import java.util.List;

public interface FeedbackService {
    FeedBack saveFeedback(FeedBack feedback);
    // Read operation
    List<FeedBack> fetchFeedbackList();
}
