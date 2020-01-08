export const NAMESPACE = 'dfh';
export const TEXT_DOMAIN = 'dfh';

export const CATEGORY_COMMON = 'dfh-common';
export const CATEGORY_LANDING = 'dfh-landing';
export const CATEGORY_LAYOUT = 'dfh-layout';
export const CATEGORY_MEDIA = 'dfh-media';
export const CATEGORY_RESOURCE = 'dfh-resource';
export const CATEGORY_TOOLKIT = 'dfh-toolkit';

// custom content types and taxonomies
export const CONTENT_TYPE_RESOURCE = 'dfh_resource';
export const TAXONOMY_RESOURCE = 'dfh_resource_classification';

// for frontend script to know where to insert messages for resource overview
export const CLASS_RESOURCE_MESSAGE_AREA = 'resource-previews-label';

// documentation for stores at https://developer.wordpress.org/block-editor/data/
export const STORE_BLOCK_EDITOR = 'core/block-editor';
export const STORE_CORE = 'core';
export const STORE_EDITOR = 'core/editor';

export const INNER_BLOCKS_LOCKED = 'all';
export const INNER_BLOCKS_UNLOCKED = false;
export const INNER_BLOCKS_FORCE_ATTRS_ALL = 'applyToAll';

export const CORE_BLOCK_AUDIO = 'core/audio';
export const CORE_BLOCK_GALLERY = 'core/gallery';
export const CORE_BLOCK_IMAGE = 'core/image';
export const CORE_BLOCK_LIST = 'core/list';
export const CORE_BLOCK_SEPARATOR = 'core/separator';
export const CORE_BLOCK_SPACER = 'core/spacer';
export const CORE_BLOCK_VIDEO = 'core/video';

export const BLOCK_BUTTON_CONTAINER = `${NAMESPACE}/button-container`;
export const BLOCK_CONTENT_CONTAINER = `${NAMESPACE}/content-container`;
export const BLOCK_FILE_BUTTON = `${NAMESPACE}/file-button`;
export const BLOCK_HEADING = `${NAMESPACE}/heading`;
export const BLOCK_INNER_BLOCK_WRAPPER = `${NAMESPACE}/inner-block-wrapper`;
export const BLOCK_LINK_BUTTON = `${NAMESPACE}/link-button`;
export const BLOCK_PAGE_HEADER = `${NAMESPACE}/page-header`;
export const BLOCK_PAGE_TITLE = `${NAMESPACE}/page-title`;
export const BLOCK_SEARCH_INPUT = `${NAMESPACE}/search-input`;
export const BLOCK_TEXT = `${NAMESPACE}/text`;
export const BLOCK_VIDEO_THUMBNAIL = `${NAMESPACE}/video-thumbnail`;

export const BLOCK_LANDING_CONTACT = `${NAMESPACE}/landing-contact`;
export const BLOCK_LANDING_FEATURED = `${NAMESPACE}/landing-featured`;
export const BLOCK_LANDING_HEADER = `${NAMESPACE}/landing-header`;
export const BLOCK_LANDING_VIDEO = `${NAMESPACE}/landing-video`;

export const BLOCK_RESOURCE_CATEGORY_FILTER = `${NAMESPACE}/resource-category-filter`;
export const BLOCK_RESOURCE_DETAIL_DESCRIPTION = `${NAMESPACE}/resource-detail-description`;
export const BLOCK_RESOURCE_DETAIL_INFO = `${NAMESPACE}/resource-detail-info`;
export const BLOCK_RESOURCE_DETAIL_STEPS = `${NAMESPACE}/resource-detail-steps`;
export const BLOCK_RESOURCE_DETAIL_STEPS_STEP = `${NAMESPACE}/resource-detail-steps-step`;

export const BLOCK_TOOLKIT_DETAIL_HEADER = `${NAMESPACE}/toolkit-detail-header`;
export const BLOCK_TOOLKIT_DETAIL_LIST = `${NAMESPACE}/toolkit-detail-list`;
export const BLOCK_TOOLKIT_DETAIL_LIST_LINK = `${NAMESPACE}/toolkit-detail-list-link`;
export const BLOCK_TOOLKIT_DETAIL_SECTION = `${NAMESPACE}/toolkit-detail-section`;
export const BLOCK_TOOLKIT_DETAIL_SECTION_CONTAINER = `${NAMESPACE}/toolkit-detail-section-container`;
export const BLOCK_TOOLKIT_DETAIL_SECTION_INFO = `${NAMESPACE}/toolkit-detail-section-info`;

export const BUTTON_SIZE_DEFAULT = '';
export const BUTTON_SIZE_SMALL = 'small';

export const TEXT_SIZE_LARGE = 'large';
export const TEXT_SIZE_DEFAULT = '';
export const TEXT_SIZE_SMALL = 'small';

export const HEADING_SIZE_XLARGE = '1';
export const HEADING_SIZE_LARGE = '2';
export const HEADING_SIZE_MEDIUM = '3';
export const HEADING_SIZE_SMALL = '4';

// NOTE: need to add enter list of possible embed block to list of allowed blocks if allowing
// any core media block! The reason is that all core media blocks will eventually transform into
// a core embed block of some sort
export const CORE_EMBED_BLOCKS = [
  'core-embed/amazon-kindle',
  'core-embed/animoto',
  'core-embed/cloudup',
  'core-embed/collegehumor',
  'core-embed/crowdsignal',
  'core-embed/dailymotion',
  'core-embed/facebook',
  'core-embed/flickr',
  'core-embed/hulu',
  'core-embed/imgur',
  'core-embed/instagram',
  'core-embed/issuu',
  'core-embed/kickstarter',
  'core-embed/meetup-com',
  'core-embed/mixcloud',
  'core-embed/polldaddy',
  'core-embed/reddit',
  'core-embed/reverbnation',
  'core-embed/screencast',
  'core-embed/scribd',
  'core-embed/slideshare',
  'core-embed/smugmug',
  'core-embed/soundcloud',
  'core-embed/speaker',
  'core-embed/speaker-deck',
  'core-embed/spotify',
  'core-embed/ted',
  'core-embed/tumblr',
  'core-embed/twitter',
  'core-embed/videopress',
  'core-embed/vimeo',
  'core-embed/wordpress',
  'core-embed/wordpress-tv',
  'core-embed/youtube',
  'core/embed',
];
