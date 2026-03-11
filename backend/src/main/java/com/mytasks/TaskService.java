package com.mytasks;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong(1);

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task createTask(String title, String description) {
        Task task = new Task(counter.getAndIncrement(), title, description);
        tasks.add(task);
        return task;
    }

    public Task moveTask(Long id, String status) {
        return tasks.stream()
                .filter(t -> t.getId().equals(id))
                .findFirst()
                .map(t -> {
                    t.setStatus(status);
                    return t;
                })
                .orElse(null);
    }

    public boolean deleteTask(Long id) {
        return tasks.removeIf(t -> t.getId().equals(id));
    }
}
