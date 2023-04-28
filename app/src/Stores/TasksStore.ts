import {observable, action, makeObservable, computed, runInAction} from 'mobx';
import {ApiMain, LoadingSettings, api} from "../Api/api-main.ts";

export type Task = {
    id: string
    name: string
    isDone: boolean
    updatedAt: number
    author: string
}

class TasksStore {
    api:ApiMain = api
    ls:LoadingSettings = {
        setLoading: (s: boolean) => this.setLoadingState(s),
        setError: (s: boolean) => this.setErrorState(s),
    }

    @observable tasks:Task[] = [];
    @observable tasksListLoading = false;
    @observable tasksListHasError = false;

    constructor() {
        makeObservable(this);
        this.fetchTasks()
    }

    @action setLoadingState = (bool: boolean) => this.tasksListLoading = bool
    @action setErrorState = (bool: boolean) => this.tasksListHasError = bool

    @computed get sortedTasks() {
        return this.tasks.slice().sort((a, b) => a.updatedAt - b.updatedAt)
    }

    @computed get tasksDone() {
        return this.sortedTasks.filter(t => t.isDone)
    }

    @computed get tasksTodo() {
        return this.sortedTasks.filter(t => !t.isDone)
    }

    @action async delete(id: string) {
        const result = await this.api.deleteBool(`/task/${id}`, this.ls, null)
        if (result) runInAction(() => this.tasks = this.tasks.filter(t => t.id !== id))
    }

    @action async markAsDone(id: string) {
        const result = await this.api.patchBool(`/task/${id}/done`, this.ls, null)
        if (result) runInAction(() => this.tasks.forEach(t => t.id === id ? t.isDone = true : ""))
    }

    @action async createTask(authorName: string, taskName: string) {
        const payload = {
            authorName,
            task: {
                name: taskName
            }
        }

        const result = await this.api.postJsonJson<Task>(`/task`, this.ls, payload)
        if (result) runInAction(() => this.tasks.push(result))
    }

    @action async fetchTasks() {
        const result = await this.api.getJson<Task[]>(`/task`, this.ls)
        if (result) {
            runInAction(() => this.tasks = result)
            this.ls.setError(false)
        }
    }
}

export const tasksStore= new TasksStore()