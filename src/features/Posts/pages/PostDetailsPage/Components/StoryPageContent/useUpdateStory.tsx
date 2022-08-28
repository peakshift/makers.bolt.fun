import { createAction } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteStoryMutation } from "src/graphql";
import { Story } from "src/features/Posts/types"
import { stageStory } from "src/redux/features/staging.slice";
import { NotificationsService } from "src/services/notifications.service";
import { useAppDispatch } from "src/utils/hooks";
import { useReduxEffect } from "src/utils/hooks/useReduxEffect";
import { openModal } from "src/redux/features/modals.slice";


const CONFIRM_DELETE_STORY = createAction<{ confirmed?: boolean }>('DELETE_STORY_CONFIRMED')({})

export const useUpdateStory = (story: Story) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [deleteMutation] = useDeleteStoryMutation({
        variables: {
            deleteStoryId: story.id
        },
        onError: (error) => NotificationsService.error('Unexpected error happened, please try again', { error }),
        onCompleted: () => window.location.pathname = '/blog',
        refetchQueries: ['Feed', 'TrendingPosts']
    })

    const handleEdit = () => {
        dispatch(stageStory({
            ...story,
            cover_image: story.cover_image
        }))

        navigate("/blog/create-post?type=story")
    };

    const onConfirmDelete = useCallback(({ payload: { confirmed } }: typeof CONFIRM_DELETE_STORY) => {
        if (confirmed)
            deleteMutation()
    }, [deleteMutation])

    useReduxEffect(onConfirmDelete, CONFIRM_DELETE_STORY.type);

    const handleDelete = () => {
        dispatch(openModal({
            Modal: "ConfirmModal",
            props: {
                callbackAction: {
                    type: CONFIRM_DELETE_STORY.type,
                    payload: {}
                },
                actionName: "Delete",
                title: "Delete Story",
                message: "Are you sure you want to delete this story ??",
                color: "red"
            }
        }))
    }

    return {
        handleEdit,
        handleDelete
    }

}