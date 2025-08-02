'use client';

import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { UserProfile as UserProfileType } from '../types/user';

interface UserProfileProps {
  profile?: UserProfileType;
  isOwner?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ profile, isOwner = false }) => {
  const { themeConfig } = useTheme();

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      className="w-full h-full flex flex-col"
      style={{ backgroundColor: themeConfig.colors.surface }}
    >
      {/* Profile Header */}
      <div 
        className="p-4 border-b"
        style={{ borderColor: themeConfig.colors.border }}
      >
        <img
          src={profile.profileImage}
          alt={`${profile.name}'s profile`}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          style={{ boxShadow: themeConfig.shadows.md }}
        />
        <div className="text-center">
          <h3 
            className="font-semibold text-xl"
            style={{ color: themeConfig.colors.textPrimary }}
          >
            {profile.name}
          </h3>
          <p 
            className="text-sm mt-1"
            style={{ color: themeConfig.colors.textSecondary }}
          >
            {profile.title}
          </p>
          {profile.bio && (
            <p 
              className="text-sm mt-2"
              style={{ color: themeConfig.colors.textMuted }}
            >
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      {/* Tech Stack */}
      {profile.skillSet.length > 0 && (
        <div 
          className="p-4 border-b"
          style={{ borderColor: themeConfig.colors.border }}
        >
          <h2 
            className="text-center py-2 px-4 rounded text-sm font-semibold mb-3"
            style={{
              backgroundColor: themeConfig.colors.primary,
              color: themeConfig.colors.background,
            }}
          >
            Skill Set
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.skillSet.map(skill => {
              const skillName = typeof skill === 'string' ? skill : skill.name;
              const skillId = typeof skill === 'string' ? skill : skill.id;
              return (
                <span
                  key={skillId}
                  className="px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: themeConfig.colors.skillBg,
                    color: themeConfig.colors.skillText,
                    boxShadow: themeConfig.shadows.sm,
                  }}
                >
                  {skillName}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Services */}
      {profile.services.length > 0 && (
        <div 
          className="p-4 border-b"
          style={{ borderColor: themeConfig.colors.border }}
        >
          <h2 
            className="text-center py-2 px-4 rounded text-sm font-semibold mb-3"
            style={{
              backgroundColor: themeConfig.colors.primary,
              color: themeConfig.colors.background,
            }}
          >
            Service Area
          </h2>
          <ul className="space-y-2">
            {profile.services.map((service) => (
              <li 
                key={service.id} 
                className="flex items-center gap-2 text-sm py-2 px-3 rounded transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{
                  color: themeConfig.colors.textSecondary,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themeConfig.colors.skillBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>{service.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Social Links */}
      {profile.socialLinks && (
        <div className="p-4 border-b flex justify-center gap-4"
          style={{ borderColor: themeConfig.colors.border }}
        >
          {profile.socialLinks.github && (
            <a 
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              <Github size={20} />
            </a>
          )}
          {profile.socialLinks.linkedin && (
            <a 
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              <Linkedin size={20} />
            </a>
          )}
          {profile.socialLinks.twitter && (
            <a 
              href={profile.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              style={{ color: themeConfig.colors.textSecondary }}
            >
              <Twitter size={20} />
            </a>
          )}
        </div>
      )}

      {/* Contact Button */}
      <div className="p-4 mt-auto">
        <button className={`
          w-full font-bold rounded-full border-2 border-transparent
          py-3 px-6 transition-all duration-300 ease-in-out
          hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 
          active:scale-95 flex items-center justify-center gap-2
        `}
        style={{
          background: `linear-gradient(135deg, ${themeConfig.colors.gradientFrom}, ${themeConfig.colors.gradientTo})`,
          color: themeConfig.colors.background,
          boxShadow: themeConfig.shadows.md,
        }}
        >
          <Mail className="w-4 h-4" />
          Contact {profile.name.split(' ')[0]}
        </button>
      </div>
    </div>
  );
};