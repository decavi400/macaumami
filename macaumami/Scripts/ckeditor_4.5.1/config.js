/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.filebrowserBrowseUrl = 'Scripts/ckeditor_4.5.1/ckfinder/ckfinder.html';
    config.filebrowserImageBrowseUrl = 'Scripts/ckeditor_4.5.1/ckfinder/ckfinder.html?Type=Images';
    config.filebrowserFlashBrowseUrl = 'Scripts/ckeditor_4.5.1/ckfinder/ckfinder.html?Type=Flash';
    config.filebrowserUploadUrl = 'Scripts/ckeditor_4.5.1/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files'; //可上傳一般檔案
    config.filebrowserImageUploadUrl = 'Scripts/ckeditor_4.5.1/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';//可上傳圖檔
    config.filebrowserFlashUploadUrl = 'Scripts/ckeditor_4.5.1/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';//可上傳Flash檔案

    config.allowedContent = true;

    config.height = 400;
};
