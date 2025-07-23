import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, User, Building, ChevronLeft, ChevronRight } from "lucide-react";

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data - será substituído por dados reais da API
  const events = [
    {
      id: 1,
      title: "Reunião com cliente",
      description: "Alinhamento do projeto de identidade visual",
      startTime: "2024-01-15T09:00:00",
      endTime: "2024-01-15T10:00:00",
      client: "Empresa XYZ",
      createdBy: "João Silva",
      type: "reuniao"
    },
    {
      id: 2,
      title: "Apresentação de proposta",
      description: "Apresentar proposta para novo site",
      startTime: "2024-01-15T14:30:00",
      endTime: "2024-01-15T15:30:00",
      client: "Startup ABC",
      createdBy: "Maria Santos",
      type: "apresentacao"
    },
    {
      id: 3,
      title: "Alinhamento de projeto",
      description: "Revisar entregáveis da campanha",
      startTime: "2024-01-15T16:00:00",
      endTime: "2024-01-15T17:00:00",
      client: "Loja 123",
      createdBy: "Pedro Costa",
      type: "alinhamento"
    },
    {
      id: 4,
      title: "Brainstorming criativo",
      description: "Sessão de ideias para nova campanha",
      startTime: "2024-01-16T10:00:00",
      endTime: "2024-01-16T11:30:00",
      client: "Empresa XYZ",
      createdBy: "Ana Lima",
      type: "brainstorming"
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'reuniao': return 'default';
      case 'apresentacao': return 'warning';
      case 'alinhamento': return 'secondary';
      case 'brainstorming': return 'success';
      default: return 'secondary';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'reuniao': return 'Reunião';
      case 'apresentacao': return 'Apresentação';
      case 'alinhamento': return 'Alinhamento';
      case 'brainstorming': return 'Brainstorming';
      default: return type;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const groupEventsByDate = () => {
    const grouped: { [key: string]: typeof events } = {};
    
    events.forEach(event => {
      const date = formatDate(event.startTime);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });
    
    return grouped;
  };

  const eventsGrouped = groupEventsByDate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
          <p className="text-muted-foreground">Gerencie compromissos e eventos</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle className="text-xl">
                  {currentDate.toLocaleDateString('pt-BR', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </CardTitle>
                <CardDescription>
                  {Object.keys(eventsGrouped).length} dias com eventos
                </CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Hoje
              </Button>
              <Button variant="outline" size="sm">
                Semana
              </Button>
              <Button variant="outline" size="sm">
                Mês
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Events List */}
      <div className="space-y-6">
        {Object.entries(eventsGrouped).map(([date, dayEvents]) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">{date}</h2>
              <Badge variant="secondary">{dayEvents.length} eventos</Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dayEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{event.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                      </div>
                      <Badge variant={getEventTypeColor(event.type) as any}>
                        {getEventTypeLabel(event.type)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{event.client}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{event.createdBy}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}