import { observable, action, makeObservable, computed } from 'mobx';

export type Task = {
    id: string
    name: string
    isDone: boolean
    updatedAt: number
    author: string
}

// create a mobx observable
class TasksStore {
    @observable tasks:Task[] = [];
    @observable tasksListLoading = false;
    @observable tasksListHasError = false;

    constructor() {
        makeObservable(this);
        this.fetchTasks()
    }

    @computed get sortedTasks() {
        return this.tasks.slice().sort((a, b) => {
            return a.updatedAt - b.updatedAt
        })
    }

    @computed get tasksDone() {
        return this.sortedTasks.filter(t => t.isDone)
    }

    @computed get tasksTodo() {
        return this.sortedTasks.filter(t => !t.isDone)
    }

    @action async delete(id: string) {
        try {
            this.tasksListLoading = true
            const response = await fetch(`http://localhost:3000/task/${id}`,{ method: "DELETE" })
            this.tasksListLoading = false
            if (response.status !== 200) {
                this.tasksListHasError = true
                console.error(await response.text())
                return
            }

            this.tasksListHasError = false
            this.tasks = this.tasks.filter(t => t.id !== id)
        } catch(e) {
            console.error(e)
            this.tasksListHasError = true
        }
    }

    @action async markAsDone(id: string) {
        try {
            this.tasksListLoading = true
            const response = await fetch(`http://localhost:3000/task/${id}/done`,{ method: "PATCH" })
            this.tasksListLoading = false
            if (response.status !== 200) {
                this.tasksListHasError = true
                console.error(await response.text())
                return
            }

            this.tasksListHasError = false
            this.tasks.forEach(t => t.id === id ? t.isDone = true : "")
        } catch(e) {
            console.error(e)
            this.tasksListHasError = true
        }
    }

    @action async createTask(authorName: string, taskName: string) {
        try {
            const payload = {
                authorName,
                task: {
                    name: taskName
                }
            }

            this.tasksListLoading = true
            const response = await fetch("http://localhost:3000/task", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload)
            })
            this.tasksListLoading = false
            if (response.status !== 200) {
                this.tasksListHasError = true
                console.error(await response.text())
                return
            }

            this.tasksListHasError = false
            this.tasks.push(await response.json())
        } catch(e) {
            console.error(e)
            this.tasksListHasError = true
        }
    }

    @action async fetchTasks() {
        try {
            this.tasksListLoading = true
            const response = await fetch("http://localhost:3000/task")
            this.tasksListLoading = false
            if (response.status !== 200) {
                this.tasksListHasError = true
                console.error(await response.text())
                return
            }

            this.tasksListHasError = false
            this.tasks = await response.json()
        } catch(e) {
            console.error(e)
            this.tasksListHasError = true
        }
    }
}

export const tasksStore= new TasksStore()