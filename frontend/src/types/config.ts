export interface AdvancedConfig {
  text_det_limit_side_len: number;
  use_doc_orientation_classify: boolean;
  use_doc_unwarping: boolean;
  use_textline_orientation: boolean;
}

export interface TranslatorConfig extends AdvancedConfig {
  lang: string;
  from_lan: string;
  to_lan: string;
}
