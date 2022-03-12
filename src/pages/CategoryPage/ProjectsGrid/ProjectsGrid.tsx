import React from 'react'
import ProjectCardMini from 'src/Components/Cards/ProjectCardMini/ProjectCardMini'
import mockData from 'src/api/mockData.json'

export default function ProjectsGrid() {
    return (
        <div style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(296px, 1fr))',
            display: 'grid',
            gridGap: '24px',
        }}>
            {Array(30).fill(0).map((_, idx) => <ProjectCardMini key={idx} project={mockData.projectsCards[0]} onClick={() => { }} />)}
        </div>
    )
}
