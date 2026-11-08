import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorOrAdmin } from '../access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: {
    singular: 'Inbound Lead',
    plural: 'Inbound Leads (CRM)',
  },
  admin: {
    useAsTitle: 'organizationName',
    defaultColumns: ['organizationName', 'fullName', 'workEmail', 'tier', 'score', 'status', 'createdAt'],
    group: 'Inquiries & CRM',
    description: 'Enterprise corporate training intake leads submitted via the PontLook matching wizard.',
  },
  lockDocuments: false,
  access: {
    read: isEditorOrAdmin,
    create: () => true, // Allows server-side intake submissions via Local API or REST
    update: isEditorOrAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'leadId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Unique reference identifier (e.g. PL-M3X...)',
      },
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: {
        description: 'Contact full name',
      },
    },
    {
      name: 'workEmail',
      type: 'email',
      required: true,
      index: true,
      admin: {
        description: 'Verified business/corporate email',
      },
    },
    {
      name: 'jobTitle',
      type: 'text',
      admin: {
        description: 'Organizational job title / role',
      },
    },
    {
      name: 'organizationName',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Company or government agency name',
      },
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Primary corporate location / country',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      admin: {
        description: 'Direct phone number with international country code',
      },
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'buyer',
      options: [
        { label: 'Corporate Buyer / L&D Sponsor', value: 'buyer' },
        { label: 'Training Provider / Institute', value: 'provider' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'QUALIFIED',
      options: [
        { label: 'Hot (High Urgency & High Budget)', value: 'HOT' },
        { label: 'Warm (Mid-Market Qualified)', value: 'WARM' },
        { label: 'Qualified (Standard Inbound)', value: 'QUALIFIED' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'score',
      type: 'number',
      required: true,
      index: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Algorithmic qualification score (0-100)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'new',
      options: [
        { label: 'New / Uncontacted', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'In Qualification', value: 'in_qualification' },
        { label: 'Proposals Sent', value: 'proposals_sent' },
        { label: 'Won / Enrolled', value: 'won' },
        { label: 'Lost', value: 'lost' },
        { label: 'Disqualified / Spam', value: 'disqualified' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'trainingDomains',
      type: 'text',
      admin: {
        description: 'Resolved training domains requested by the enterprise',
      },
    },
    {
      name: 'deliveryMode',
      type: 'text',
      admin: {
        description: 'Preferred format (In-Person, Virtual, Hybrid)',
      },
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'language',
      type: 'text',
    },
    {
      name: 'customization',
      type: 'text',
    },
    {
      name: 'cohortSize',
      type: 'text',
    },
    {
      name: 'timeline',
      type: 'text',
    },
    {
      name: 'budgetBand',
      type: 'text',
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'USD',
    },
    {
      name: 'headcount',
      type: 'text',
    },
    {
      name: 'additionalContext',
      type: 'textarea',
      admin: {
        description: 'Special requirements, bespoke objectives, or compliance mandates',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal concierge & sales notes (private to admin & editor)',
      },
    },
    {
      name: 'dispatchStatus',
      type: 'group',
      label: 'Notification Dispatch Status',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'emailSent',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'slackSent',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'crmSent',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'checklist',
      type: 'json',
      admin: {
        description: 'Verification criteria evaluation snapshot',
      },
    },
    {
      name: 'sourceIp',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
