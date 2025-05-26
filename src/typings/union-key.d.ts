declare namespace UnionKey {
  type ThemeMode = 'light' | 'dark' | 'auto';
  type PageAnimateMode = 'fade' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out' | 'none';
  type SourceType = 'projects' | 'pages' | 'layers' | 'template' | 'image' | 'text' | 'sticker' | 'more';
  type LayerType = 'image' | 'text' | 'shape' | 'group' | string;
  type DesignMode = 'editor' | 'preview';
  type RecordType = 'delete' | 'create' | 'update' | 'global';
  type SvgColorType = 'one' | 'more';
  type UnitType = 'px' | 'mm' | 'cm';
  type ElOptionType = 'basic' | 'animation' | 'colour' | 'caption' | 'mask';
}