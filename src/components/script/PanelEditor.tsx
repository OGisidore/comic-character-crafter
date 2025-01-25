import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RefreshCw, Trash2, Settings2 } from 'lucide-react';
import { toast } from 'sonner';
import PanelCustomizer from './PanelCustomizer';
import ScriptEditor from './ScriptEditor';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

interface PanelEditorProps {
  panel: {
    id: string;
    scene: string;
    dialogue: string;
    characters: string[];
    generatedImage?: string;
    dialogueSize?: number;
  };
  onUpdate: (updatedPanel: any) => void;
  onRegenerate: () => void;
  onDelete: () => void;
}

const PanelEditor = ({ panel, onUpdate, onRegenerate, onDelete }: PanelEditorProps) => {
  const [dialogueSize, setDialogueSize] = useState(panel.dialogueSize || 16);

  const handleDialogueSizeChange = (size: number) => {
    setDialogueSize(size);
    onUpdate({
      ...panel,
      dialogueSize: size
    });
  };

  const handleSceneChange = (scene: string) => {
    onUpdate({
      ...panel,
      scene
    });
  };

  const handleDialogueChange = (dialogue: string) => {
    onUpdate({
      ...panel,
      dialogue
    });
  };

  const handleRegenerate = () => {
    onRegenerate();
    toast.success('Regenerating panel...');
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <Label>Scene Description</Label>
          <Textarea
            value={panel.scene}
            onChange={(e) => handleSceneChange(e.target.value)}
            placeholder="Describe the scene..."
            className="min-h-[100px]"
          />
        </div>
        <div className="flex gap-2 ml-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" title="Panel settings">
                <Settings2 className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Panel Settings</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <PanelCustomizer
                  panelId={panel.id}
                  dialogueSize={dialogueSize}
                  onDialogueSizeChange={handleDialogueSizeChange}
                  onRegeneratePanel={handleRegenerate}
                />
              </div>
            </SheetContent>
          </Sheet>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRegenerate}
            title="Regenerate panel"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onDelete}
            title="Delete panel"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Dialogue</Label>
        <Textarea
          value={panel.dialogue}
          onChange={(e) => handleDialogueChange(e.target.value)}
          placeholder="Enter character dialogue..."
          style={{ fontSize: `${dialogueSize}px` }}
        />
      </div>

      {panel.generatedImage && (
        <div className="mt-4">
          <img
            src={panel.generatedImage}
            alt="Panel preview"
            className="w-full rounded-lg shadow-md"
          />
          <div 
            className="mt-2 p-2 bg-muted rounded-lg"
            style={{ fontSize: `${dialogueSize}px` }}
          >
            {panel.dialogue}
          </div>
        </div>
      )}
    </Card>
  );
};

export default PanelEditor;