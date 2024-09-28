import React, { useState, useEffect } from "react";
import userimg from "../Media/user.jpg";
import { storage, db } from "../Database/Firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserAuth } from "../Context/AuthContext";

const Profile = () => {
  const { user, profilePic, setProfilePic } = UserAuth();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user && user.email) {
        const userDocRef = doc(db, "users", user.email);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData.profilePicture) {
            setProfilePic(userData.profilePicture);
          }
        }
      }
      setLoading(false);
    };

    fetchProfilePicture();
  }, [user, setProfilePic]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(
        storage,
        `profilePictures/${user.email}_${file.name}`
      );

      try {
        const userDocRef = doc(db, "users", user.email);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData.profilePictureRef) {
            const prevStorageRef = ref(
              storage,
              `profilePictures/${userData.profilePictureRef}`
            );
            await deleteObject(prevStorageRef);
          }
        }

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        await setDoc(
          userDocRef,
          {
            profilePicture: downloadURL,
            profilePictureRef: `${user.email}_${file.name}`,
          },
          { merge: true }
        );

        setProfilePic(downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="bg-black text-white h-screen font-abc">
      <div className="w-full p-6 flex flex-col gap-10 items-center justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="h-72 w-72 rounded-full bg-blue-100 overflow-hidden">
              <img src={profilePic} alt="Profile" />
            </div>
            <h1
              className="hover:underline cursor-pointer"
              onClick={handleClick}
            >
              Change profile picture
            </h1>
            <input
              type="file"
              id="fileInput"
              accept="image/jpeg, image/png"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {uploading && <p>Uploading...</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
