package com.example.doc_app.service;


import com.example.doc_app.entity.Schedule;

import java.util.List;

public interface ScheduleService {

    Schedule saveSchedule(Schedule schedule);

    List<Schedule> fetchScheduleList();
    List<Schedule> deleteScheduleById (int id);

    Schedule fetchScheduleById(int id);

}
