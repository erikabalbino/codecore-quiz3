class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token

  def not_found
    render(
      json: {
        errors: [{
          type: "NotFound"
        }]
      },
      status: :not_found # :not_found is alias for 404 in rails
    )
  end

  private
  def current_user
    auth = request.headers["AUTHORIZATION"]
    token = auth.present? ? auth.split('JWT ').join('') : '';

    # The decoded token will be array containing
    # the payload and the JWT header in that order.
    begin
      payload = JWT.decode(
        token,
        Rails.application.secrets.secret_key_base
      )&.first

      @user ||= User.find_by(id: payload["id"])
      rescue JWT::DecodeError => error
      nil
    end
  end

  helper_method :current_user

  def authenticate_user!
    unless current_user.present?
      render(
        json: {
          errors: [{
            type: "Unauthorized"
          }]
        },
        status: :unauthorized # alias for status code 401
      )
    end
  end

end
