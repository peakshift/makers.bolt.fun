import React from 'react'
import AutoComplete from 'src/Components/Inputs/Autocomplete/Autocomplete'
import { Topic, useAllTopicsQuery } from 'src/graphql'
import { ControlledStateHandler } from 'src/utils/interfaces';



type Props<IsMulti extends boolean> = ControlledStateHandler<Topic, IsMulti>



export default function TopicsInput<IsMulti extends boolean = false>(props: Props<IsMulti>) {

    const topicsQuery = useAllTopicsQuery();

    return (
        <AutoComplete
            isClearable
            placeholder='Choose a topic'
            options={topicsQuery.data?.allTopics!}
            labelField='title'
            valueField='id'
            isMulti={props.isMulti}
            isLoading={topicsQuery.loading}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}

        />
    )
}
