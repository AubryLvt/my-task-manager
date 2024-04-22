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

  constructor() {}

  // --------------------------------------
  // Méthode pour ajouter une nouvelle tâche
  // --------------------------------------
  addTask(task: Task): void {
    // Récupérer les tâches existantes depuis localStorage
    let tasks: Task[] = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    // Ajouter la nouvelle tâche à la liste
    tasks.push(task);
    // Sauvegarder la liste mise à jour dans localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  // --------------------------------------
  // Méthode pour récupérer toutes les tâches
  // --------------------------------------
  getTasks(): Task[] {
    // Récupérer les tâches depuis localStorage, ou retourner un tableau vide si aucune tâche n'est trouvée
    return JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  // --------------------------------------
  // Méthode pour marquer une tâche comme complétée
  // --------------------------------------
  completeTask(taskId: number): void {
    // Récupérer les tâches existantes depuis localStorage
    let tasks: Task[] = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    // Trouver l'index de la tâche à compléter dans la liste des tâches
    let taskIndex = tasks.findIndex((task) => task.id === taskId);
    // Si la tâche est trouvée, la marquer comme complétée et sauvegarder la liste mise à jour dans localStorage
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = true;
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
  }

  // --------------------------------------
  // Méthode pour supprimer une tâche
  // --------------------------------------
  deleteTask(taskId: number): void {
    // Récupérer les tâches existantes depuis localStorage
    let tasks: Task[] = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    // Filtrer les tâches pour exclure celle à supprimer
    let updatedTasks = tasks.filter((task) => task.id !== taskId);
    // Sauvegarder la liste mise à jour dans localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(updatedTasks));
  }
}
