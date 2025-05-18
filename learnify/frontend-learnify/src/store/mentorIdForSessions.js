import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

const useMentorIdForSessionsStore = create(
    devtools(
        persist(
            (set) => (
                {
                    mentorId: "",
                    setMentorId: (id) => set(() => ({ mentorId: id }))
                }
            ),
            // ({name : "%^&m%^&i^&*", storage : createJSONStorage(()=>localStorage)})
        )
    )
)

export default useMentorIdForSessionsStore