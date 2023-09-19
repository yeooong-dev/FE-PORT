import React, { useState, useEffect } from "react";
import useUser from "../../hook/UseUser";
import Modal from "react-modal";
import {
  ContentTitle,
  DeleteAccount,
  Info,
  InfoTitle,
  NameEdit,
  Profile,
  PwEdit,
  TabContainer,
} from "./StMypage";
import { BsFillPersonFill } from "react-icons/bs";
import { RiEditCircleFill } from "react-icons/ri";
import {
  imgAdd,
  imgGet,
  imgUpdate,
  imgDelete,
  updateName,
  updatePassword,
  deleteAccount,
} from "../../api/mypage";
import axios from "axios";

function Mypage() {
  Modal.setAppElement("#root");
  const user = useUser();
  const [selectedTab, setSelectedTab] = useState<
    "nameEdit" | "pwEdit" | "deleteAccount" | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // 프로필 이미지 가져오기
  useEffect(() => {
    if (user && user.id) {
      (async () => {
        try {
          const response = await imgGet(user.id);
          setCurrentImage(response.data.imageUrl);
        } catch (error: any) {
          console.error(error);
          if (error.response && error.response.status === 404) {
            alert(error.response.data.error);
          } else {
            alert(
              "프로필 이미지를 불러오는 데 실패했습니다. 다시 시도해주세요."
            );
          }
        }
      })();
    }
  }, [user]);

  const renderContent = () => {
    switch (selectedTab) {
      case "nameEdit":
        return (
          <>
            변경 할 이름{" "}
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            이메일 입력{" "}
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            비밀번호 입력{" "}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleNameChange}>이름 변경하기</button>
          </>
        );
      case "pwEdit":
        return (
          <>
            이메일 입력{" "}
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            변경 할 비밀번호{" "}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            비밀번호 확인{" "}
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <br />
            <button onClick={handlePasswordChange}>비밀번호 변경하기</button>
          </>
        );
      case "deleteAccount":
        return (
          <>
            비밀번호 입력 <input />
            <br />
            <button onClick={handleAccountDelete}>회원 탈퇴하기</button>
          </>
        );
      default:
        return null;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  // 프로필 업로드
  const handleImageUpload = async () => {
    if (profileImage && user?.id) {
      try {
        const formData = new FormData();
        formData.append("userId", user.id.toString());
        formData.append("profileImage", profileImage);

        await axios.post("http://localhost:8000/auth/profile/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleImageUpdate = async () => {
    if (profileImage && user?.id) {
      try {
        const formData = new FormData();
        formData.append("userId", user.id);
        formData.append("profileImage", profileImage);

        await axios.put("http://localhost:8000/auth/profile/image", formData);

        const response = await imgGet(user.id);
        setCurrentImage(response.data.imageUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleImageDelete = async () => {
    if (user?.id) {
      try {
        await imgDelete(user.id);
        setCurrentImage(null);
        alert("프로필 이미지가 삭제되었습니다.");
      } catch (error) {
        console.error(error);
        alert("이미지 삭제에 실패했습니다.");
      }
    }
  };

  // 이름 변경
  const handleNameChange = async () => {
    if (!user?.id) {
      alert("유저 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
      return;
    }

    try {
      const response = await updateName(user.id, name, email);
      alert("이름이 성공적으로 변경되었습니다.");
    } catch (error) {
      alert("이름 변경에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = async () => {
    try {
      const response = await updatePassword(password, newPassword, email);
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      alert("비밀번호 변경에 실패하였습니다. 현재 비밀번호를 확인해주세요.");
    }
  };

  // 계정 삭제 핸들러
  const handleAccountDelete = async () => {
    if (window.confirm("정말로 계정을 삭제하시겠습니까?")) {
      try {
        const response = await deleteAccount();
        alert("계정이 성공적으로 삭제되었습니다.");
        // TODO: 계정 삭제 후 리다이렉트 로직 추가
      } catch (error) {
        alert("계정 삭제에 실패하였습니다.");
      }
    }
  };

  return (
    <>
      <ContentTitle>마이페이지</ContentTitle>
      <Profile>
        <BsFillPersonFill className='p_img' color='white' />
        <div onClick={openModal}>
          <RiEditCircleFill className='edit' size='45' color='#51439d' />
        </div>
        <p className='hi'>안녕하세요!</p>
        <p className='name'>{user && user.name ? `${user.name}님` : null}</p>
      </Profile>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        {currentImage ? (
          <img src={currentImage} alt='현재 프로필 이미지' />
        ) : (
          <p>이미지가 없습니다.</p>
        )}
        <input type='file' onChange={handleImageChange} />
        <button onClick={handleImageUpload}>업로드</button> <br />
        <button onClick={handleImageDelete}>이미지 삭제</button>
      </Modal>

      <InfoTitle>회원 정보 변경</InfoTitle>
      <Info>
        <TabContainer>
          <NameEdit onClick={() => setSelectedTab("nameEdit")}>
            이름 변경
          </NameEdit>
          <PwEdit onClick={() => setSelectedTab("pwEdit")}>
            비밀번호 변경
          </PwEdit>
          <DeleteAccount onClick={() => setSelectedTab("deleteAccount")}>
            회원 탈퇴
          </DeleteAccount>
        </TabContainer>
        <div className='con'>{renderContent()}</div>
      </Info>
    </>
  );
}

export default Mypage;
