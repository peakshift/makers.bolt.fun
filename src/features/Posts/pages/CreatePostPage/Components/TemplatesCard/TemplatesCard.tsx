import React from 'react'
import { useFormContext } from 'react-hook-form';
import Card from 'src/Components/Card/Card'
import { IStoryFormInputs } from '../../CreateStoryPage/CreateStoryPage';

export default function TemplatesCard() {


    const { formState: { isDirty }, reset } = useFormContext<IStoryFormInputs>();

    const clickTemplate = (template: typeof templates[number]) => {
        if (!isDirty || window.confirm("Your current unsaved changes will be lost, are you sure you want to continue?")) {
            reset({
                id: -1 * Math.random(),
                is_published: false,
                title: template.value.title,
                body: template.value.body,
            })
        }
    }

    return (
        <Card>
            <p className="text-body2 font-bolder">Story templates</p>
            <ul className=''>
                {templates.map(template =>
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
        title: "Hello!! I'm [Your Name]",
        body:
            `### Who am I?
I'm a [Your age] years old [Your job] who have been working on this field for [Years of experience] years.

### What I love?
I usually like to [Your hobby] and I also love to participate in [Some activity you like]

### Why I joined this community?
The main reason is because [Reason for joining]`
    },
},
{
    id: 2,
    title: "🚀  Product launch / update",
    description: "Launch your product with a story",
    value: {
        title: "[Your product's name] is Live now!!",
        body:
            `### What is [Your product]??
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam doloremque eaque natus aperiam voluptas obcaecati qui dolores molestiae incidunt perspiciatis sed, illo odit. Voluptatum qui fugit quidem inventore illum veritatis.

### Another question goes here
Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tempore quia et dolore accusantium blanditiis odio, ab nihil. Expedita animi labore voluptates, officiis tenetur totam?

### A final thing in mind
Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias magnam doloremque quisquam dolore odio sit atque incidunt esse vel dolor laboriosam a, laudantium ut quia fuga placeat non maiores. Odio unde harum autem commodi, tempora corporis consequuntur? Aliquam, quaerat ex.`
    },
},
{
    id: 3,
    title: "🚦 My weekly PPPs",
    description: "Let others know about your recent activity",
    value: {
        title: "My weekly PPP on [Product's name]",
        body:
            `### What did I do this week?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam doloremque eaque natus aperiam voluptas obcaecati qui dolores molestiae incidunt perspiciatis sed, illo odit. Voluptatum qui fugit quidem inventore illum veritatis.

### What challenges have I faced?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tempore quia et dolore accusantium blanditiis odio, ab nihil. Expedita animi labore voluptates, officiis tenetur totam?

### What important lessons did I learn?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias magnam doloremque quisquam dolore odio sit atque incidunt esse vel dolor laboriosam a, laudantium ut quia fuga placeat non maiores. Odio unde harum autem commodi, tempora corporis consequuntur? Aliquam, quaerat ex.`
    },
}
]