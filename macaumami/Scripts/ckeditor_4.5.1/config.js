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
    config.filebrowserUploadUrl = 'Scripts/ckeditor_4.5.1/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files'; //�i�W�Ǥ@���ɮ�
    config.filebrowserImageUploadUrl = 'Scripts/ckeditor_4.5.1/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';//�i�W�ǹ���
    config.filebrowserFlashUploadUrl = 'Scripts/ckeditor_4.5.1/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';//�i�W��Flash�ɮ�

    config.allowedContent = true;

    config.height = 400;
};
