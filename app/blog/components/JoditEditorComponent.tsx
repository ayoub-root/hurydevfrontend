import React, {useMemo, useRef, useState} from 'react';


import dynamic from "next/dynamic";
import {showInformation} from "../../../components/utilis";


// This is now your dependency import
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
}); // This is now your dependency import

const JoditEditorComponent = ({value = "", onChange}: any) => {
    const editor = useRef(null);
    const [content, setContent] = useState(value || "");

    const config: any = useMemo(
        () => ({

            zIndex: 0,

            readonly: false,
            uploader: {
                "insertImageAsBase64URI": true
            },
            activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about', 'dots'],
            toolbarButtonSize: 'middle',
            theme: 'dark',
            saveModeInCookie: false,
            spellcheck: true,
            editorCssClass: false,
            triggerChangeEvent: true,
            width: 'auto',
            height: '100%',
            minHeight: "100%",
            maxHeight: "630px",
            direction: '',
            language: 'auto',
            debugLanguage: false,
            i18n: 'en',
            tabIndex: -1,
            toolbar: true,
            enter: "DIV",
            defaultMode: 1,
            useSplitMode: false,
            colors: {
                greyscale: ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
                palette: ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
                full: [
                    '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
                    '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
                    '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
                    '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
                    '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
                    '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
                ]
            },
            colorPickerDefaultTab: 'background',
            imageDefaultWidth: 300,
            removeButtons: [],
            disablePlugins: [],
            extraButtons: [
                {
                    iconURL: './images/copy.png',
                    exec: function (editor: any) {
                        if (editor.selection.isCollapsed()) {
                            editor.execCommand('selectall');
                        }
                        editor.execCommand('copy');
                        // @ts-ignore
                        showInformation('Text in your clipboard');
                    }
                },
                {
                    name: 'insertCode',
                    iconURL: 'https://icons.iconarchive.com/icons/iconsmind/outline/128/Code-Window-icon.png',
                    exec: (editor: any) => {

                        const selectedText = editor.selected;
                        if (selectedText) {

                            editor.s.insertHTML(`<div style="border: solid 1px #ccc; width: 90%; padding: 10px; margin-block: 4px;"><code>${selectedText}</code></div>`);
                        }
                    }
                }
            ],
            sizeLG: 900,
            sizeMD: 700,
            sizeSM: 400,

            buttons: [

                {
                    iconURL: './images/copy.png',
                    exec: function (editor: any) {
                        if (editor.selection.isCollapsed()) {
                            editor.execCommand('selectall');
                        }
                        editor.execCommand('copy');
                        alert('Text in your clipboard');
                    }
                },

                'source', '|',
                'bold', 'code',
                'strikethrough',
                'underline',
                'italic', '|',
                'ul',
                'ol', '|',
                'outdent', 'indent', '|',
                'font',
                'fontsize',
                'brush',
                'paragraph', '|',
                'image',
                'video',
                'table',
                'link', '|',
                'align', 'undo', 'redo', '|',
                'hr',
                'eraser',
                'copyformat', '|',
                'symbol',
                'fullsize',
                'print',
                'about'
            ],
            buttonsXS: [
                'bold',
                'image', '|',
                'brush',
                'paragraph', '|',
                'align', '|',
                'undo', 'redo', '|',
                'eraser',
                'dots'
            ],
            events: {},
            textIcons: false,

        }),
        []
    );


    return (
        <JoditEditor
            ref={editor}
            value={content}

            config={config}

            onBlur={(newContent) => {
                setContent(newContent)
                onChange(newContent)
            }} // preferred to use only this option to update the content for performance reasons
            // onChange={(newContent) => {
            // }}

        />
    );
};
export default JoditEditorComponent;