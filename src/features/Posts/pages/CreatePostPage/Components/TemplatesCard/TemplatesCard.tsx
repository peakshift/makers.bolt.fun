import React from 'react'
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import Card from 'src/Components/Card/Card'
import { useOfficialTagsQuery } from 'src/graphql';
import { CreateStoryType } from '../../CreateStoryPage/CreateStoryPage';

export default function TemplatesCard() {


    const { formState: { isDirty }, reset } = useFormContext<CreateStoryType>();
    const officalTags = useOfficialTagsQuery();

    const clickTemplate = (template: typeof templates[number]) => {
        if (!isDirty || window.confirm("Your current unsaved changes will be lost, are you sure you want to continue?")) {
            reset({
                id: -1 * Math.random(),
                is_published: false,
                title: template.value.title,
                body: template.value.body,
                tags: officalTags.data?.officialTags.filter(tag => template.value.tags.includes(tag.title)) ?? []
            })
        }
    }



    return (
        <Card>
            <p className="text-body2 font-bolder">Story templates</p>
            <ul className=''>
                {officalTags.loading && Array(3).fill(0).map((_, idx) => <li key={idx} className='py-16 border-b-[1px] border-gray-200 last-of-type:border-b-0 last-of-type:pb-0  ' >
                    <p
                        className="hover:underline"                     >
                        <Skeleton width="12ch" />
                    </p>
                    <p className="text-body5 text-gray-400 mt-4"><Skeleton width="25ch" /></p>
                </li>)}
                {!officalTags.loading && templates.map(template =>
                    <li key={template.id} className='py-16 border-b-[1px] border-gray-200 last-of-type:border-b-0 last-of-type:pb-0  ' >
                        <p
                            className="hover:underline"
                            role={'button'}
                            onClick={() => clickTemplate(template)}
                        >
                            {template.title}
                        </p>
                        <p className="text-body5 text-gray-400 mt-4">{template.description}</p>
                    </li>)}
            </ul>
        </Card>
    )
}


const templates = [{
    id: 1,
    title: "👋  Maker intro",
    description: "Tell the community about yourself",
    value: {
        title: "Hi, I'm ___ 👋",
        body:
            `### About me 👋
Tell the community about yourself, your hobbies, and interests...

#### How did you get into bitcoin?
We've all been down the rabit hole, let's hear your side of things...

#### What's something that excites you about the space now?
What's ignigniting your maker spark? Is it a new layer spec, event, or app? We want to hear about it...

#### What's your spirit animal/star sign?
It's important, ok...

### My roles & skills 🦄
Let everyone know what roles you usually take in your product teams, plus some of your top skills and levels...

#### How can you help others?
Those skills sound awesome, is there anything you could help other makers with in particular? I'm sure they'd return the favour...

### What I'm currently working on 🧑‍💻
Working on anything exciting? List your current projects here so other makers can check out your work...

#### What can the BOLT.FUN community help you with right now?
Is there anything you need help with? There are plenty of makers around ready to help you out...
`,
        tags: ['introductions']
    },
},
{
    id: 2,
    title: "🚀  Product launch / update",
    description: "Launch your product with a story",
    value: {
        title: "Introducing ___ 🚀",
        body:
            `### Product feature/name 🚀
What is the product/feature you are launching? Tell others a bit more about what you’ve been working on?

### Problems & Solutions 🚨
What problems does this product/feature solve? Really show it off and convince makers why it’s so awesome...

### How was it built? 🛠
Tell other makers about how you built this product/feature? What lightning specs, codebases, templates, packages, etc does it use? Maybe others can learn from your experience...

### Blockers & Issues ✋
Did you have any trouble building this product/feature? It’s good to share these details for others to learn from...

### Try it out 🔗
Got a link to your product/feature? Post it here for others to find...`,
        tags: ["product", "activity"]
    }
},
{
    id: 3,
    title: "🚦 Weekly Report",
    description: "Let others know about your recent activity",
    value: {
        title: "PPPs: Week ___ 🚀",
        body: `### Plans 📆
- Start writing your plans for next week here...

### Progress ✅
- Start writing your progress from last week here...

### Problems ✋

- Start writing your problems and blockers from last week here...

### Links 🔗
- Reference your Github issues, notes, or anything else you might want to add...`, tags: ['activity']
    },
}
]