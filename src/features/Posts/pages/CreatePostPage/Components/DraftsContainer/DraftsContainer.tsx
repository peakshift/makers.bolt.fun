import { createAction } from '@reduxjs/toolkit';
import React, { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import Button from 'src/Components/Button/Button';
import LoadingPage from 'src/Components/LoadingPage/LoadingPage';
import { isStory } from 'src/features/Posts/types';
import { Post_Type, useDeleteStoryMutation, useGetMyDraftsQuery, usePostDetailsLazyQuery } from 'src/graphql'
import { openModal } from 'src/redux/features/modals.slice';
import { NotificationsService } from 'src/services';
import { getDateDifference } from 'src/utils/helperFunctions';
import { useAppDispatch } from 'src/utils/hooks';
import { useReduxEffect } from 'src/utils/hooks/useReduxEffect';
import { IStoryFormInputs } from '../../CreateStoryPage/CreateStoryPage';

interface Props {
    id?: string;
    type: Post_Type,
    onDraftLoad?: () => void,
}

const CONFIRM_DELETE_STORY = createAction<{ confirmed?: boolean, id: number }>('DELETE_STORY_CONFIRMED')({ id: -1 })

export default function DraftsContainer({ id, type, onDraftLoad }: Props) {


    const myDraftsQuery = useGetMyDraftsQuery({ variables: { type } });
    const [fetchDraft] = usePostDetailsLazyQuery();
    const [deleteStory] = useDeleteStoryMutation({
        refetchQueries: ['GetMyDrafts']
    })
    const { setValue } = useFormContext<IStoryFormInputs>()
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false)

    const loadDraft = (id: number) => {
        if (!loading)
            setLoading(true);
        fetchDraft({ variables: { type, id } })
            .then(({ data }) => {
                // data.data?.getPostById.
                if (data?.getPostById) {
                    if (isStory(data.getPostById)) {
                        setValue('id', data.getPostById.id);
                        setValue('title', data.getPostById.title);
                        setValue('tags', data.getPostById.tags);
                        setValue('body', data.getPostById.body);
                        setValue('cover_image', data.getPostById.cover_image);
                        setValue('is_published', data.getPostById.is_published);
                    }

                }

                onDraftLoad?.()
            })
            .catch(() => {
                NotificationsService.error("Unexpected error happened...")
            })
            .finally(() => {
                setLoading(false);
            })
    }


    const onConfirmDelete = useCallback(({ payload: { confirmed, id } }: typeof CONFIRM_DELETE_STORY) => {
        if (confirmed)
            deleteStory({
                variables: {
                    deleteStoryId: id
                }
            })
    }, [deleteStory])

    useReduxEffect(onConfirmDelete, CONFIRM_DELETE_STORY.type);

    const deleteDraft = (id: number) => {
        dispatch(openModal({
            Modal: "ConfirmModal",
            props: {
                callbackAction: {
                    type: CONFIRM_DELETE_STORY.type,
                    payload: {
                        id
                    }
                },
                actionName: "Delete",
                title: "Delete Draft",
                message: "Are you sure you want to delete this draft ??",
                color: "red"
            }
        }))
    }

    return (

        <div id={id}>
            {(!myDraftsQuery.loading && myDraftsQuery.data?.getMyDrafts && myDraftsQuery.data.getMyDrafts.length > 0) &&
                <div className="bg-white border-2 border-gray-200 rounded-16 p-16">
                    <p className="text-body2 font-bolder mb-16">Saved Drafts</p>
                    <ul className=''>
                        {myDraftsQuery.data.getMyDrafts.map(draft =>
                            <li key={draft.id} className='py-16 border-b-[1px] border-gray-200 last-of-type:border-b-0  ' >
                                <p
                                    className="hover:underline"
                                    role={'button'}
                                    onClick={() => loadDraft(draft.id)}
                                >
                                    {draft.title}
                                </p>
                                <div className="flex gap-4 text-body5">
                                    <p className="text-gray-400">Last edited {getDateDifference(draft.updatedAt, { dense: true })} ago</p>
                                    <Button size='sm' color='none' className='text-red-500 !p-0' onClick={() => deleteDraft(draft.id)}>Delete draft</Button>
                                </div>
                            </li>)}
                    </ul>
                </div>}
            {loading && <LoadingPage />}
        </div>
    )
}
