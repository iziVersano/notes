import React, { useEffect } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Form } from 'react-bootstrap';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';

interface MarkdownEditorProps {
  value: string;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
  error?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  setValue,
  trigger,
  error,
}) => {
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );
  const [content, setContent] = React.useState<string>(value);

  const converter = new Showdown.Converter();

  const handleContentChange = (val: string) => {
    setContent(val);
    setValue('content', val);
    trigger('content');
  };

  useEffect(() => {
    setValue('content', content);
  }, [setValue, content]);

  return (
    <Form.Group controlId="noteContent" className="mb-3">
      <Form.Label>Content</Form.Label>
      <ReactMde
        value={content}
        onChange={handleContentChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
      {error && (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default MarkdownEditor;
