import { create } from 'axios'

const customFetch = create({
    baseURL: '/api/v1',
})

export default customFetch