import AxiosInstances from ".";

const addService = async (data) => {
    return await AxiosInstances.post("/service/add-service", data)
}

const updateService = async (id, data) => {
    return await AxiosInstances.put("/service/update-service/"+id, data)
}

const getAllServices = async () => {
    return await AxiosInstances.get("/service/get-all-services")
}

const getServiceByMentor = async (mentorId) => {
    return await AxiosInstances.get(`/service/get-service-by-mentor/${mentorId}`)
}

const getServiceById = async (id) => {
    return await AxiosInstances.get(`/service/${id}`)
}

const serviceApi = {addService, updateService, getAllServices, getServiceByMentor, getServiceById}
export default serviceApi;