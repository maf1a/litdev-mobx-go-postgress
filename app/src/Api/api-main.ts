export interface LoadingSettings {
    setLoading(s: boolean): void
    setError(s: boolean): void
}

export class ApiMain {
    private root: string = ""

    constructor(root: string) {
        this.root = root
    }

    async getText(url: string, ls: LoadingSettings): Promise<string> {
        const uri = this.root + url

        try {
            ls.setLoading(true)
            const response = await fetch(uri)
            const text = await response.text()
            if (![200, 404].includes(response.status)) {
                throw `Could not fetch request:\nStatus: ${response.status}.\nResponse: ${text}`
            }

            ls.setLoading(false)
            return text
        } catch(e) {
            console.error(e)
            ls.setError(true)
        }

        return ""
    }

    async getJson<R extends Object>(url: string, ls: LoadingSettings): Promise<R | null> {
        const uri = this.root + url

        try {
            ls.setLoading(true)
            const response = await fetch(uri)
            if (![200, 404].includes(response.status)) {
                const text = await response.text()
                throw `Could not fetch get request:\nStatus: ${response.status}.\nResponse: ${text}`
            }

            const json = await response.json() as R
            ls.setLoading(false)
            return json
        } catch(e) {
            console.error(e)
            ls.setError(true)
        }

        return null
    }

    async postJsonJson<R extends object>(url: string, ls: LoadingSettings, pl: Object): Promise<R | null> {
        const uri = this.root + url

        try {
            ls.setLoading(true)
            const response = await fetch(uri, {
                method: "POST",
                body: JSON.stringify(pl),
                headers: {
                    "content-type": "application/json"
                }
            })

            if (![200, 404].includes(response.status)) {
                const text = await response.text()
                throw `Could not fetch post request:\nStatus: ${response.status}.\nResponse: ${text}`
            }

            const json = await response.json() as R
            ls.setLoading(false)
            return json
        } catch(e) {
            console.error(e)
            ls.setError(true)
        }

        return null
    }

    async patchBool(url: string, ls: LoadingSettings, pl: Object | null): Promise<boolean> {
        const uri = this.root + url

        try {
            ls.setLoading(true)
            const response = await fetch(uri, {
                method: "PATCH",
                body: pl ? JSON.stringify(pl) : undefined
            })

            if (![200].includes(response.status)) {
                const text = await response.text()
                throw `Could not fetch patch request:\nStatus: ${response.status}.\nResponse: ${text}`
            }

            ls.setLoading(false)
            return true
        } catch(e) {
            console.error(e)
            ls.setError(true)
        }

        return false
    }

    async deleteBool(url: string, ls: LoadingSettings, pl: Object | null): Promise<boolean> {
        const uri = this.root + url

        try {
            ls.setLoading(true)
            const response = await fetch(uri, {
                method: "DELETE",
                body: pl ? JSON.stringify(pl) : undefined
            })

            if (![200].includes(response.status)) {
                const text = await response.text()
                throw `Could not fetch delete request:\nStatus: ${response.status}.\nResponse: ${text}`
            }

            ls.setLoading(false)
            return true
        } catch(e) {
            console.error(e)
            ls.setError(true)
        }

        return false
    }
}

export const api = new ApiMain("http://localhost:3000")
