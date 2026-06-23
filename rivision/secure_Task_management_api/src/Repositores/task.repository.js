


import { tasks } from "../data/tasks.js";


export const taskRepo = {
    findById(id)
 {
     return tasks.find((task) => task.id === id);
 },

 findAll() {
    return tasks;
 },


 findByManager(managerId) {
    return tasks.filter((task) => task.managerId === managerId);
 },

 findByAssignee(userId) {
    return tasks.filter((task) => task.assignedTo === userId);
 },

   create(taskdata) {
    tasks.push(taskdata);
    return taskdata;
   },

   update(id, updateData) {
   
    const task = tasks.find(
      (task) => task.id === id  
    );

    if(!task) return null;

    Object.assign(task, updateData);
    return task;

   },
   delete(id) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if(taskIndex === -1) {
        return null;
    }

    const deleteTask = tasks[taskIndex];

    return deleteTask;
   }
} 