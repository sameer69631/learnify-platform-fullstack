import { useRef, useState } from 'react'
import { Avatar, Modal, Input, Spin, message, Form, Button } from 'antd'
import useUserStore from '../../store/userStore'
import userApi from '../../apiManager/UserApi'
import toast from 'react-hot-toast'
import { AiOutlineUser, AiOutlineMail, AiFillLinkedin, AiFillGithub, AiFillTwitterCircle, AiFillFacebook, AiFillInstagram } from 'react-icons/ai'
import Dashboard from './Dashboard'

function Profile() {
  const { user: mentorData, setUser } = useUserStore();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const profilePicRef = useRef(null)

  const generateAvatarUrl = (name) => {
    const initials = name.split(" ").map((word) => word.charAt(0).toUpperCase()).join("");
    return `https:ui-avatars.com/api/?name=${initials}`
  }

  const handleEditProfile = () => {
    setIsEditProfile(true)
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true)
      const formData = new FormData();
      formData.append("photo", file);
      try {
        const response = await userApi.uploadImage(formData);
        setUser({ ...mentorData, photoUrl: response?.data.photoUrl });
      }
      catch (err) {
        console.log("image upload failed", err.message)
        toast.error("Image upload failed")
      }
      finally {
        setLoading(false)
      }
    }
  }

  const handleModalSubmit = async (values) => {
    const updatedUserData = {
      title: values.title,
      tags: values.tags?.split(",").map((data) => data.trim()),
      bio: values.bio,
      college: values.college,
      social: {
        linkedin: values.social?.linkedin,
        github: values.social?.github,
        twitter: values.social?.twitter,
        facebook: values.social?.facebook,
        instagram: values.social?.instagram
      },
    }
    try {
      const response = await userApi.updateUserProfile(updatedUserData);
      if(response){
        setIsEditProfile(false)
        setUser({ ...mentorData, profile: updatedUserData });
      }
    }
    catch (err) {
      console.log(`unable to update profile ${err.message}`)
      toast.error("Unable to update profile")
    }
  }

  return (
    <Dashboard>
    <div className='flex flex-col items-center w-full min-h-screen p-10 bg-gradient-to-r from-green-100 to-green-50'>
      {/* profile */}
      <div className="flex flex-col w-full max-w-5xl p-8 space-y-10 bg-white shadow-xl rounded-3xl">
        <h1 className='text-yellow-600 text-4xl font-bold text-center'>My Profile</h1>

        <Spin spinning={loading}>
          <div className='flex justify-center'>
            <Avatar onClick={() => {
                if(!loading){
                  profilePicRef.current.click();
                }
              }}
              size={180}
              src={mentorData?.photoUrl || generateAvatarUrl(mentorData?.name || "User")}
              className="border-4 border-green-300 shadow-lg cursor-pointer transform hover:scale-110 transition-all"
            />
          </div>
        </Spin>

        <input type="file" ref={profilePicRef} className='hidden' onChange={handleImageChange} disabled={loading}/>

        <div className='flex flex-col justify-center items-center space-y-2 mb-4'>
          <h3 className='text-green-700 text-2xl'>{mentorData?.name.split(" ").map((data) => data[0].toUpperCase()+data.slice(1)).join(" ")}</h3>
          <h3 className='flex gap-2 items-center'><AiOutlineMail />{mentorData?.email}</h3>
          {mentorData.role == "mentor" && <h3 className='flex gap-2 items-center'><AiOutlineUser />Title : {mentorData?.profile?.title}</h3>}
          <h3>Skills : {mentorData?.profile?.tags.map((data) => <span className='bg-gray-200 p-1 rounded-xl mx-1'>{data}</span>)}</h3>
          <h3>Bio : {mentorData?.profile?.bio}</h3>
          {mentorData.role == "mentor" && <h3>College : {mentorData?.profile?.college}</h3>}
          <h1 className='text-yellow-300 text-3xl font-semibold mt-4'>Connect With Me</h1>
        </div>

        {/* socials */}
        <div className='flex justify-evenly'>
          <a href={mentorData?.profile?.social?.linkedin} target='_blank'>
            <AiFillLinkedin className='text-4xl' />
          </a>
          <a href={mentorData?.profile?.social?.github} target='_blank'>
            <AiFillGithub className='text-4xl' />
          </a>
          <a href={mentorData?.profile?.social?.twitter} target='_blank'>
            <AiFillTwitterCircle className='text-4xl' />
          </a>
          <a href={mentorData?.profile?.social?.facebook} target='_blank'>
            <AiFillFacebook className='text-4xl' />
          </a>
          <a href={mentorData?.profile?.social?.instagram} target='_blank'>
            <AiFillInstagram className='text-4xl' />
          </a>
        </div>
        {/* Edit profile button */}
        <div>
          <button onClick={handleEditProfile}
            className="w-full p-2 mt-2 text-lg bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all"
          >Edit Profile</button>
        </div>
      </div>

      {/* Modal Effect */}
      <div>
        <Modal open={isEditProfile} onCancel={() => setIsEditProfile(false)} footer={null} width={"55%"}>
          <Form initialValues={{
            name: mentorData?.name,
            title: mentorData?.profile?.title,
            tags: mentorData?.profile?.tags?.join(", "),
            bio: mentorData?.profile?.bio,
            college: mentorData?.profile?.college,
            social: mentorData?.profile?.social,
          }} onFinish={handleModalSubmit} layout='vertical' >
            <Form.Item label="Name" name={"name"} rules={[{ required: true, message: "Name is required" }]}>
              <Input placeholder='Enter your name' />
            </Form.Item>

            {mentorData?.role == "mentor" && <Form.Item label="Title" name={"title"} rules={[{ required: true, message: "Title is required" }]}>
              <Input placeholder='Enter title(eg : Software Developer)' />
            </Form.Item>}

            <Form.Item label="Skills" name={"tags"} rules={[{ required: true, message: "Skills are required, enter skills seperated by commas" }]}>
              <Input placeholder='Enter your skills seperated by commas' />
            </Form.Item>

            <Form.Item label="Bio" name={"bio"} rules={[{ required: true, message: "Bio is required" }]}>
              <Input.TextArea placeholder='Enter your bio' />
            </Form.Item>

            {mentorData.role == "mentor" && <Form.Item label="College" name={"college"} rules={[{ required: true, message: "College is required" }]}>
              <Input placeholder='Enter your college' />
            </Form.Item>}

            <Form.Item label="Linkedin" name={["social", "linkedin"]}>
              <Input placeholder='Enter LinkedIn Url Followed by https://' />
            </Form.Item>
            <Form.Item label="GitHub" name={["social", "github"]}>
              <Input placeholder='Enter GitHub Url Followed by https://' />
            </Form.Item>
            <Form.Item label="Twitter" name={["social", "twitter"]}>
              <Input placeholder='Enter Twitter Url Followed by https://' />
            </Form.Item>
            <Form.Item label="Facebook" name={["social", "facebook"]}>
              <Input placeholder='Enter Facebook Url Followed by https://' />
            </Form.Item>
            <Form.Item label="Instagram" name={["social", "instagram"]}>
              <Input placeholder='Enter Instagram Url Followed by https://' />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className="w-full bg-green-500 rounded-lg hover:bg-green-600">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
    </Dashboard>
  )
}

export default Profile