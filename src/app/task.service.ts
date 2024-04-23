import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
// => indique que le service peut être injecté à des composants
// -
export class TaskService {
  // Clé utilisée pour stocker les tâches dans localStorage
  private readonly storageKey = 'tasks';
  // Variable stockant les tâches :
  private tasks: Task[];

  constructor() {
    this.tasks = this.getStoredTasks();
    // permet d'initialiser l'instance de TaskService
    // sinon le service serait vide lors du lancement
  }

  // -------- Méthodes pour récupérer toutes les tâches --------
  private getStoredTasks(): Task[] {
    // Récupérer les tâches depuis localStorage, ou retourner un tableau vide si aucune tâche n'est trouvée
    return JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  getTasks(): Task[] {
    return this.getStoredTasks();
  }

  // -------- Méthode pour ajouter une nouvelle tâche --------
  addTask(task: Task): void {
    // Ajouter la nouvelle tâche à la liste
    this.tasks.push(task);
    // Sauvegarder la liste mise à jour dans localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  // -------- Méthode pour sauvegarder les tâches dans localStorage --------
  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  // -------- Méthode pour marquer une tâche comme complétée --------
  completeTask(taskId: number): void {
    // Trouver l'index de la tâche à compléter dans la liste des tâches
    let taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    // Si la tâche est trouvée, la marquer comme complétée et sauvegarder la liste mise à jour dans localStorage
    if (taskIndex !== -1) {
      this.tasks[taskIndex].completed = true;
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }
  }

  // -------- Méthode pour supprimer une tâche --------
  deleteTask(taskId: number): void {
    // Filtrer les tâches pour exclure celle à supprimer
    let updatedTasks = this.tasks.filter((task) => task.id !== taskId);
    // Sauvegarder la liste mise à jour dans localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
  }
}
