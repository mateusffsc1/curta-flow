import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Plus, Calendar, User, MessageSquare, Phone, Mail, Video } from "lucide-react";

interface ProspectDetailProps {
  prospectId: string;
}

export default function ProspectDetail({ prospectId }: ProspectDetailProps) {
  const [newInteraction, setNewInteraction] = useState("");

  // Mock data - será substituído por dados reais da API
  const prospect = {
    id: 1,
    name: "Tech Innovations",
    company: "Tech Innovations Ltda",
    email: "contato@techinnovations.com",
    phone: "(11) 99999-1111",
    origin: "Instagram",
    interest: "Identidade Visual",
    status: "novo",
    responsibleName: "João Silva",
    lastContact: "2024-01-14",
    notes: "Empresa de tecnologia interessada em rebranding completo"
  };

  const interactions = [
    {
      id: 1,
      userId: 1,
      userName: "João Silva",
      interactionDate: "2024-01-15T10:30:00",
      type: "call",
      notes: "Primeira conversa telefônica. Cliente interessado em identidade visual completa. Solicitou proposta para logotipo + aplicações."
    },
    {
      id: 2,
      userId: 1,
      userName: "João Silva",
      interactionDate: "2024-01-14T16:15:00",
      type: "email",
      notes: "Enviei email de follow-up após contato via Instagram. Cliente respondeu demonstrando interesse real."
    },
    {
      id: 3,
      userId: 4,
      userName: "Ana Lima",
      interactionDate: "2024-01-13T14:20:00",
      type: "meeting",
      notes: "Reunião de descoberta. Empresa fundada em 2020, 15 funcionários, setor de tecnologia B2B. Orçamento estimado entre R$ 8-12k."
    },
    {
      id: 4,
      userId: 1,
      userName: "João Silva",
      interactionDate: "2024-01-12T09:00:00",
      type: "message",
      notes: "Primeiro contato via Instagram. Cliente chegou através de post sobre rebranding."
    }
  ];

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Video className="h-4 w-4" />;
      case 'message': return <MessageSquare className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case 'call': return 'warning';
      case 'email': return 'default';
      case 'meeting': return 'success';
      case 'message': return 'secondary';
      default: return 'secondary';
    }
  };

  const getInteractionLabel = (type: string) => {
    switch (type) {
      case 'call': return 'Ligação';
      case 'email': return 'E-mail';
      case 'meeting': return 'Reunião';
      case 'message': return 'Mensagem';
      default: return type;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-BR'),
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'secondary';
      case 'negociando': return 'warning';
      case 'convertido': return 'success';
      case 'perdido': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'novo': return 'Novo Lead';
      case 'negociando': return 'Em Negociação';
      case 'convertido': return 'Convertido';
      case 'perdido': return 'Perdido';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{prospect.name}</h1>
          <p className="text-muted-foreground">Histórico de interações</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Prospect Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Informações do Prospect
              <Badge variant={getStatusColor(prospect.status) as any}>
                {getStatusLabel(prospect.status)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">{prospect.name}</h3>
              <p className="text-sm text-muted-foreground">{prospect.company}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {prospect.email}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {prospect.phone}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                Responsável: {prospect.responsibleName}
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Interesse:</p>
              <p className="text-sm text-muted-foreground">{prospect.interest}</p>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">Origem:</p>
              <Badge variant="outline">{prospect.origin}</Badge>
            </div>

            {prospect.notes && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Observações:</p>
                <p className="text-sm text-muted-foreground">{prospect.notes}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Ligar
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                E-mail
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Interactions Timeline */}
        <div className="md:col-span-2 space-y-6">
          {/* Add New Interaction */}
          <Card>
            <CardHeader>
              <CardTitle>Nova Interação</CardTitle>
              <CardDescription>
                Registre um novo contato com este prospect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Descreva o que aconteceu nesta interação..."
                value={newInteraction}
                onChange={(e) => setNewInteraction(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Interação
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Registrar Ligação
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4 mr-2" />
                  Agendar Reunião
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interactions History */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Interações</CardTitle>
              <CardDescription>
                {interactions.length} interações registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interactions.map((interaction) => {
                  const { date, time } = formatDateTime(interaction.interactionDate);
                  return (
                    <div key={interaction.id} className="flex gap-4 p-4 border rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(interaction.userName)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getInteractionColor(interaction.type) as any} className="gap-1">
                            {getInteractionIcon(interaction.type)}
                            {getInteractionLabel(interaction.type)}
                          </Badge>
                          <span className="text-sm font-medium">{interaction.userName}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {date} às {time}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {interaction.notes}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}