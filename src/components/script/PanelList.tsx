import React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import PanelEditor from './PanelEditor';

interface Panel {
  id: string;
  scene: string;
  dialogue: string;
  characters: string[];
  generatedImage?: string;
}

interface PanelListProps {
  panels: Panel[];
  onPanelsReorder: (panels: Panel[]) => void;
  onRegeneratePanel: (panelIndex: number) => void;
  onUpdatePanel: (index: number, panel: Panel) => void;
  onDeletePanel: (index: number) => void;
}

const PanelList = ({
  panels,
  onPanelsReorder,
  onRegeneratePanel,
  onUpdatePanel,
  onDeletePanel
}: PanelListProps) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(panels);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onPanelsReorder(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="panels">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {panels.map((panel, index) => (
              <Draggable
                key={panel.id}
                draggableId={panel.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-background"
                  >
                    <PanelEditor
                      panel={panel}
                      onUpdate={(updatedPanel) => onUpdatePanel(index, updatedPanel)}
                      onRegenerate={() => onRegeneratePanel(index)}
                      onDelete={() => onDeletePanel(index)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PanelList;