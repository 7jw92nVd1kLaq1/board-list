import React, { useEffect, useRef } from "react";

import { openModal as openAddBoardModal } from "../../../stores/slices/addBoardsModalSlice";

import BoardEditButton from "./BoardEditButton/BoardEditButton";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";
import { openModal as openLoggerModal } from "../../../stores/slices/loggerSlice";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../../firebase";
import { setUser } from "../../../stores/slices/userSlice";
import { useAuth } from "../../../hooks/redux";


type BoardEditButtonContainerProps = {
    toggleDeleteModeCallback: () => void;
};


const BoardEditButtonContainer : React.FC<BoardEditButtonContainerProps> = ({toggleDeleteModeCallback}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { email: userEmail } = useAuth();
    const [visible, setVisible] = React.useState<boolean>(false);
    const MenuRef = useRef<HTMLInputElement>(null);
    const MenuButtonRef = useRef<HTMLButtonElement>(null);

    const className = clsx(
        visible ? 'visible' : 'invisible',
        'absolute', 'right-2', 'w-max', 'z-50', 'overflow-hidden'
    );

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleLogin = async () => {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (!user) return;

        const email = user.email;
        const id = user.uid;
        const accessToken = await user.getIdToken();

        dispatch(setUser({ email, id, accessToken }));
    };

    const handleLogout = () => {
        dispatch(setUser({ email: "", id: "", accessToken: "" }));
    };

    const addBoard = () => {
        dispatch(openAddBoardModal());
    }

    const checkBoardLog = () => {
        dispatch(openLoggerModal())
    }

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            // Close the menu if the user clicks outside of it
            if (
                MenuRef.current && 
                !MenuRef.current.contains(event.target as Node)
            ) {
                if (MenuButtonRef.current && MenuButtonRef.current.contains(event.target as Node)) {
                    setVisible(!visible);
                } else {
                    setVisible(false);
                }
            } else {
                setVisible(true);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    });

    return (
        <div className="mr-10 relative">
            <button 
                ref={MenuButtonRef} 
                className="p-2 m-2 rounded-md shadow-md bg-[#FFD0EC] text-[#1F2544]"
            >
                Menu
            </button>
            <div className={className} ref={MenuRef}>
                <div className="flex flex-col overflow-hidden text-[#1F2544] items-stretch w-full rounded-lg">
                    {userEmail && (
                    <div className="flex flex-col gap-1 items-start bg-[#FFD0EC] p-3">
                        <p className="text-lg font-medium">Welcome!</p>
                        <p className="text-sm line-clamp-1">{userEmail.slice(0, 20)}{userEmail.length > 20 && "..."}</p>
                    </div>
                    )}
                    <BoardEditButton 
                        name="Add Board" 
                        onClick={addBoard} 
                    />
                    <BoardEditButton 
                        name="Delete Board" 
                        onClick={toggleDeleteModeCallback} 
                    />
                    <BoardEditButton 
                        name="Check Board Log" 
                        onClick={checkBoardLog} 
                    />
                    {!userEmail && (
                        <BoardEditButton
                            name="Login"
                            onClick={handleLogin}
                        />
                    )}
                    {userEmail && (
                        <BoardEditButton
                            name="Logout"
                            onClick={handleLogout}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoardEditButtonContainer;