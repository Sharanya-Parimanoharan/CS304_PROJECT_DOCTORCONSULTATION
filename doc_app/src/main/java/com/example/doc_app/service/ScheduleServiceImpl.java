package com.example.doc_app.service;

import com.example.doc_app.entity.Schedule;
import com.example.doc_app.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;
    private int id;

    // Save operation
    @Override
    public Schedule saveSchedule(Schedule schedule)
    {
        return scheduleRepository.save(schedule);
    }

    // Read operation
    @Override
    public List<Schedule> fetchScheduleList()
    {
        return
                scheduleRepository.findAll();
    }

    @Override
    public Schedule fetchScheduleById(int id){
        if(scheduleRepository.findById(id)==null){
            return null;
        }
        return scheduleRepository.findById(id).get();
    }



    // Delete operation
    @Override
    public List<Schedule> deleteScheduleById(int id)
    {
        scheduleRepository.deleteById(id);
        return scheduleRepository.findAll();
    }

}
