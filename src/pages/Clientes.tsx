import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Mail, Phone, Building, Calendar, FileText, ExternalLink } from "lucide-react";

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - será substituído por dados reais da API
  const clients = [
    {
      id: 1,
      name: "Empresa XYZ",
      email: "contato@empresaxyz.com",
      phone: "(11) 99999-9999",
      company: "Empresa XYZ Ltda",
      contractStart: "2023-08-15",
      servicePlan: "Premium",
      activeTasks: 3,
      completedTasks: 12,
      socialLinks: {
        instagram: "@empresaxyz",
        website: "https://empresaxyz.com"
      },
      notes: "Cliente estratégico com demandas recorrentes"
    },
    {
      id: 2,
      name: "Startup ABC",
      email: "hello@startupABC.com",
      phone: "(11) 88888-8888",
      company: "Startup ABC",
      contractStart: "2023-10-01",
      servicePlan: "Básico",
      activeTasks: 2,
      completedTasks: 5,
      socialLinks: {
        instagram: "@startupABC",
        linkedin: "startup-abc"
      },
      notes: "Startup em crescimento, foco em branding"
    },
    {
      id: 3,
      name: "Loja 123",
      email: "vendas@loja123.com",
      phone: "(11) 77777-7777",
      company: "Loja 123 Comércio",
      contractStart: "2023-11-15",
      servicePlan: "Intermediário",
      activeTasks: 1,
      completedTasks: 8,
      socialLinks: {
        instagram: "@loja123",
        facebook: "loja123oficial"
      },
      notes: "E-commerce com foco em redes sociais"
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Premium': return 'default';
      case 'Intermediário': return 'warning';
      case 'Básico': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">Gerencie sua carteira de clientes</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <CardDescription>{client.company}</CardDescription>
                </div>
                <Badge variant={getPlanColor(client.servicePlan) as any}>
                  {client.servicePlan}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Cliente desde {new Date(client.contractStart).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">{client.activeTasks}</div>
                  <div className="text-xs text-muted-foreground">Ativas</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-success">{client.completedTasks}</div>
                  <div className="text-xs text-muted-foreground">Concluídas</div>
                </div>
              </div>

              {/* Social Links */}
              {client.socialLinks && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Redes Sociais</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(client.socialLinks).map(([platform, handle]) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {handle}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {client.notes && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Observações</p>
                  <p className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                    {client.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Projetos
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}