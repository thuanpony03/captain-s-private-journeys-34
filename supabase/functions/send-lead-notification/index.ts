import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadSubmission {
  destination: string;
  group_size: string;
  priority: string;
  contact: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadSubmission = await req.json();

    console.log("Received lead submission:", leadData);

    // Create Supabase client with service role for bypassing RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save to database
    const { data: savedLead, error: dbError } = await supabase
      .from("lead_submissions")
      .insert({
        destination: leadData.destination,
        group_size: leadData.group_size,
        priority: leadData.priority,
        contact: leadData.contact,
        status: "new",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to save lead: ${dbError.message}`);
    }

    console.log("Lead saved to database:", savedLead.id);

    // Format the destination label
    const destinationLabels: Record<string, string> = {
      usa: "USA - West Coast Road Trip",
      australia: "Australia - Great Ocean Road",
      europe: "Europe (Paris • Rome • Zurich)",
      other: "Khác - Để Vinh tư vấn",
    };

    const priorityLabels: Record<string, string> = {
      health: "Sức khỏe (Lịch nhẹ nhàng, thoải mái)",
      experience: "Trải nghiệm (Văn hóa, ẩm thực độc đáo)",
      luxury: "Sang trọng (Check-in đẳng cấp)",
    };

    // Send email notification
    const emailResponse = await resend.emails.send({
      from: "Vinh Around <onboarding@resend.dev>",
      to: ["luongcongthuann@gmail.com"], // Replace with actual email
      subject: "🎯 Lead Mới Từ Landing Page!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #1a5f5a 0%, #2d7e75 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Lead Mới!</h1>
            <p style="color: #ffd700; margin: 10px 0 0 0; font-size: 14px;">Có khách hàng tiềm năng mới quan tâm</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1a5f5a; margin-top: 0; border-bottom: 2px solid #ffd700; padding-bottom: 10px;">
              Thông Tin Lead
            </h2>
            
            <div style="margin: 20px 0;">
              <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <strong style="color: #1a5f5a; display: block; margin-bottom: 5px;">📍 Điểm đến:</strong>
                <span style="color: #333; font-size: 16px;">${destinationLabels[leadData.destination] || leadData.destination}</span>
              </div>
              
              <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <strong style="color: #1a5f5a; display: block; margin-bottom: 5px;">👥 Số lượng:</strong>
                <span style="color: #333; font-size: 16px;">${leadData.group_size} người</span>
              </div>
              
              <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <strong style="color: #1a5f5a; display: block; margin-bottom: 5px;">⭐ Ưu tiên:</strong>
                <span style="color: #333; font-size: 16px;">${priorityLabels[leadData.priority] || leadData.priority}</span>
              </div>
              
              <div style="background: #fff4e6; padding: 15px; border-radius: 8px; border-left: 4px solid #ffd700;">
                <strong style="color: #1a5f5a; display: block; margin-bottom: 5px;">📞 Liên hệ:</strong>
                <span style="color: #333; font-size: 18px; font-weight: bold;">${leadData.contact}</span>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
              <p style="color: #666; margin: 0; font-size: 14px;">
                ID Lead: <code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px;">${savedLead.id}</code>
              </p>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
                Thời gian: ${new Date().toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>Email tự động từ hệ thống Vinh Around Landing Page</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        leadId: savedLead.id,
        message: "Lead saved and notification sent",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  } catch (error: any) {
    console.error("Error in send-lead-notification function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
