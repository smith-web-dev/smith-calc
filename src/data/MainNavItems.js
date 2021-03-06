export default [
  { heading: 'General', display: true },
  {
    icon: 'fas fa-tape',
    text: 'Roll Length',
    path: '/roll-length',
    display: true
  },
  {
    icon: 'fas fa-th-large',
    text: 'Square Footage',
    path: '/sqft',
    display: true
  },
  { divider: true, display: true },
  { heading: 'Conveyor Belt', display: true },
  {
    icon: 'fas fa-weight',
    text: 'Conveyor Belt Weight',
    path: '/cb-weight',
    display: true
  },
  {
    icon: 'fas fa-ruler',
    text: 'Conveyor Length',
    path: '/cb-length',
    display: true
  },
  {
    icon: 'fas fa-arrows-alt',
    text: 'Precleaner Position',
    path: '/preclean-pos',
    display: false
  },
  { divider: true, display: true },
  { heading: 'Hose', display: true },
  {
    icon: 'fas fa-compress',
    text: 'Crimp Spec',
    path: '/crimp',
    display: true
  },
  { divider: true, display: true },
  { heading: 'Snowplow Blades', display: true },
  {
    icon: 'fas fa-snowflake',
    text: 'Snowplow Blade Weight',
    path: '/snowplow-weight',
    display: true
  }
]
