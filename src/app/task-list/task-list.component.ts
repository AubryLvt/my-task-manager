import { Component } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

let taskIdCounter = 0;

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: Task[];
  newTaskName: string;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    if (this.newTaskName.trim() === '') {
      return;
    }
    const newTask: Task = {
      id: this.generateUniqueId(),
      name: this.newTaskName,
      completed: false,
    };
    this.tasks.push(newTask);
    this.newTaskName = '';
    this.taskService.saveTasks();
  }

  completeTask(task: Task): void {
    task.completed = true;
    this.taskService.saveTasks();
  }

  deleteTask(task: Task): void {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.taskService.saveTasks();
    }
  }

  private generateUniqueId(): number {
    return ++taskIdCounter;
  }
}
