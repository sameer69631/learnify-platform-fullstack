import AxiosInstances from "."

const uploadImage = (formData) => {
    return AxiosInstances.post("/user/upload-photo", formData)
}

const updateUserProfile = (updatedData) => {
    return AxiosInstances.put("/user/update-profile", updatedData)
}

const getUser = () => {
    return AxiosInstances.get("/user")
}

const userApi = {uploadImage, updateUserProfile, getUser};
export default userApi;