import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { TeamMember } from '../../data/team'
import { TeamPortraitPlaceholder } from './TeamPortraitPlaceholder'

type TeamMemberCardProps = {
  member: TeamMember
  index: number
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="team-portrait"
    >
      <Link to={`/ekibimiz/${member.id}/`} className="team-portrait__link" aria-label={`${member.name} profilini görüntüle`}>
        <div className="team-portrait__media">
          {member.image ? (
            <img
              src={member.image}
              alt=""
              className="team-portrait__photo"
              loading="lazy"
              width={400}
              height={500}
            />
          ) : (
            <TeamPortraitPlaceholder seed={index + 1} />
          )}
        </div>
        <div className="team-portrait__caption">
          <h2 className="team-portrait__name">{member.name}</h2>
          <p className="team-portrait__role">{member.role}</p>
        </div>
      </Link>
    </motion.article>
  )
}
